import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import AnalyticsEvent from '@/models/AnalyticsEvent';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
    try {
        // Auth check
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        if (decoded.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
        }

        await dbConnect();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Filter for user-specific queries
        const userFilter = userId ? { userId } : {};
        const timeAndUserFilter = { createdAt: { $gte: thirtyDaysAgo }, ...userFilter };

        // Run all aggregations in parallel
        const [
            totalUsersCount,
            totalSessions,
            totalPageViews,
            totalSignups,
            recentEvents,
            eventsByDay,
            sessionsByCounselor,
            topEvents,
            userList,
        ] = await Promise.all([
            // Total registered users (always global or filtered by ID if provided?)
            // Usually global summary shows total system users
            User.countDocuments(),

            // Total counseling sessions started
            AnalyticsEvent.countDocuments({ event: 'session_start', ...userFilter }),

            // Total page views
            AnalyticsEvent.countDocuments({ event: 'page_view', ...userFilter }),

            // Total signups
            AnalyticsEvent.countDocuments({ event: 'signup', ...userFilter }),

            // 20 most recent events
            AnalyticsEvent.find(userFilter)
                .sort({ createdAt: -1 })
                .limit(20)
                .lean(),

            // Events grouped by day (last 30 days)
            AnalyticsEvent.aggregate([
                { $match: timeAndUserFilter },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
                { $project: { date: '$_id', count: 1, _id: 0 } },
            ]),

            // Sessions grouped by counselor name
            AnalyticsEvent.aggregate([
                { $match: { event: 'session_start', ...userFilter } },
                {
                    $group: {
                        _id: '$metadata.counselor',
                        sessions: { $sum: 1 },
                    },
                },
                { $sort: { sessions: -1 } },
                { $project: { name: { $ifNull: ['$_id', 'Unknown'] }, sessions: 1, _id: 0 } },
            ]),

            // Top event types by count
            AnalyticsEvent.aggregate([
                { $match: userFilter },
                {
                    $group: {
                        _id: '$event',
                        count: { $sum: 1 },
                    },
                },
                { $sort: { count: -1 } },
                { $limit: 8 },
                { $project: { event: '$_id', count: 1, _id: 0 } },
            ]),

            // User list with stats (only if no specific userId is requested)
            !userId ? AnalyticsEvent.aggregate([
                {
                    $group: {
                        _id: '$userId',
                        email: { $first: '$userEmail' },
                        totalEvents: { $sum: 1 },
                        lastActive: { $max: '$createdAt' },
                        sessions: {
                            $sum: { $cond: [{ $eq: ['$event', 'session_start'] }, 1, 0] }
                        }
                    }
                },
                { $match: { _id: { $ne: null } } },
                { $sort: { lastActive: -1 } },
                { $limit: 100 }
            ]) : Promise.resolve([]),
        ]);

        return NextResponse.json({
            summary: {
                totalUsers: totalUsersCount,
                totalSessions,
                totalPageViews,
                totalSignups,
            },
            recentEvents,
            eventsByDay,
            sessionsByCounselor,
            topEvents,
            userList: userList || [],
            isFiltered: !!userId,
            filterUserId: userId
        });
    } catch (error) {
        console.error('[analytics/summary] error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
