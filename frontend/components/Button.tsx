import { ubuntuMono } from '@/app/fonts';
import Link from 'next/link';

export default function Button({
    color,
    label,
    type,
    extraClasses,
    href,
}: Readonly<{
    color: 'yellow' | 'green' | 'black';
    label: string;
    type?: 'submit';
    extraClasses?: string;
    href?: string;
}>) {
    const textColor = color === 'yellow' ? 'text-gfl-black' : 'text-gfl-white';

    const Button = () => (
        <button
            className={`bg-gfl-${color} ${ubuntuMono.className} ${textColor} ${
                extraClasses ? extraClasses : ''
            } shadow-lg shadow-black/20 text-xl px-6 py-2 rounded-2xl`}
            type={type === 'submit' ? 'submit' : undefined}
        >
            {label}
        </button>
    );

    return (
        <>
            {href ? (
                <Link href={href}>
                    <Button />
                </Link>
            ) : (
                <Button />
            )}
        </>
    );
}
