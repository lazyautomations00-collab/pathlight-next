import { ImageResponse } from 'next/og';
import { Logo } from './components/Logo';

export const runtime = 'edge';

// Image metadata
export const alt = 'Pathlight - AI-Powered Mental Health Support';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    // Font loading
    const interBold = await fetch(
        new URL('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff')
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(to bottom right, #0F172A, #1E293B)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'white',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1.5)' }}>
                    {/* We use the Logo component here. 
               Since it expects className for sizing, but here we might need inline styles or just rely on its SVG attributes. 
               The Logo component uses className="w-8 h-8" by default. We should override this if possible, 
               but the Logo component applies className to the SVG. 
               In OG generation, tailwind classes might not work directly without configuration.
               However, passing a style object isn't supported by the current Logo component interface (only className). 
               We can wrap it or just rely on the SVG viewBox. 
               Let's try passing a large width/height via style or className if supported by Satori.
               The Logo component takes `className`.
           */}
                    <Logo className="w-64 h-64 text-white" />
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: interBold,
                    style: 'normal',
                    weight: 700,
                },
            ],
        }
    );
}
