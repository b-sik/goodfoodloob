'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav
            className={`${
                menuOpen ? 'grow-mobile-nav' : 'shrink-mobile-nav'
            } bg-gfl-deep-purple text-gfl-white flex flex-col items-center justify-center h-[45px] w-full fixed bottom-0 left-0 z-10 overflow-hidden rounded-tl-xl rounded-tr-xl lg:hidden`}
        >
            <button
                className='uppercase self-stretch mb-1'
                onClick={() => setMenuOpen(!menuOpen)}
            >
                Menu
            </button>

            <ul
                className={`${
                    menuOpen ? 'flex' : 'hidden'
                } flex-col justify-center h-[90%] w-[90%] items-center uppercase border-t-[1px] border-gfl-white`}
            >
                <li className='mb-4'>
                    <Link href='/blog' onClick={() => setMenuOpen(false)}>
                        Blog
                    </Link>
                </li>
                <li className='mb-4'>
                    <Link
                        href='/blog#recipes'
                        onClick={() => setMenuOpen(false)}
                    >
                        Recipes
                    </Link>
                </li>
                <li className='mb-4'>
                    <Link
                        href='/blog#events'
                        onClick={() => setMenuOpen(false)}
                    >
                        Events
                    </Link>
                </li>
                <li className='mb-4'>
                    <Link href='#contact' onClick={() => setMenuOpen(false)}>
                        Info
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
