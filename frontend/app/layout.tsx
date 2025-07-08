'use client';

import './globals.css';
import Body from './body';
import { usePathname } from 'next/navigation';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    return (
        <html
            lang='en'
            className={`scroll-smooth ${
                pathname === '/'
                    ? 'lg:snap-y lg:snap-mandatory lg:overflow-y-scroll'
                    : ''
            } m-0`}
        >
            <Body>{children}</Body>
        </html>
    );
}
