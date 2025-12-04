import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { name, email, password, role } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'student'
        });

        // Create JWT payload
        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        };

        // Sign token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRY || '7d' }
        );

        return NextResponse.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: 'Server Error', error: error.message },
            { status: 500 }
        );
    }
}
