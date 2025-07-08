import { quicksand, yesevaOne } from './fonts';
import Image from 'next/image';
import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';
import ContactForm from '@/components/ContactForm';
import MobileNav from '@/components/MobileNav';

export default function Body({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body
            className={`${quicksand.className} ${yesevaOne.variable} antialiased text-2xl`}
        >
            <header className='px-8 bg-gfl-deep-purple h-[80px] flex align-middle justify-center lg:justify-between sticky top-0'>
                <Link href='/' className='flex my-2'>
                    <Image
                        src='/logo-main.svg'
                        alt='GoodFoodLoob logo'
                        width={260}
                        height={80}
                    />
                </Link>
                <nav className='text-white lg:flex items-center uppercase hidden'>
                    <ul className='flex'>
                        <li>
                            <Link href='/blog'>Blog</Link>
                        </li>
                        <li className='ml-12'>
                            <Link href='/blog#recipes'>Recipes</Link>
                        </li>
                        <li className='ml-12'>
                            <Link href='/blog#events'>Events</Link>
                        </li>
                        <li className='ml-12'>
                            <Link href='#contact'>Info</Link>
                        </li>
                    </ul>
                </nav>
                <MobileNav />
            </header>

            {children}

            <footer
                id='contact'
                className='bg-gfl-red flex flex-col justify-center lg:grid grid-cols-2 lg:items-end min-h-[calc(100vh-80px)] snap-end'
            >
                <div className='lg:pr-20 flex flex-col justify-center items-center lg:items-end text-gfl-white text-center lg:text-left mt-auto py-8 lg:mt-0'>
                    <div className='max-w-96'>
                        <h1 className='text-6xl mb-8 uppercase text-gfl-lavendar'>
                            Stay in Touch
                        </h1>
                        <p className=''>For bookings and inquiries email</p>
                        <a
                            className='block mb-8 text-gfl-link-green font-semibold'
                            href='mailto:goodfoodloob@gmail.com'
                        >
                            lubna@goodfoodloob.com
                        </a>
                        <p className=''>Instagram</p>
                        <a
                            className='block mb-8 text-gfl-link-green font-semibold'
                            href='mailto:goodfoodloob@gmail.com'
                        >
                            @goodfoodloob
                        </a>
                        <NewsletterForm />
                    </div>
                </div>
                <div className='pl-20 py-8 hidden lg:flex flex-col justify-center'>
                    <div className='max-w-96'>
                        <div className='send-message-form-wrapper bg-gfl-white rounded-2xl text-gfl-black flex flex-col px-6 py-4'>
                            <h2 className='text-center font-semibold mb-4'>
                                Send a message
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
                <div className='bg-gfl-black min-w-100 self-stretch lg:self-end col-span-2 text-sm text-gfl-white justify-center items-center text-center flex flex-col mt-auto pb-[60px] pt-4 lg:mt-0 lg:flex-row lg:py-4'>
                    <p>© {new Date().getFullYear()} GoodFoodLoob.com</p>
                    <span className='hidden lg:inline-block'>
                        &nbsp;|&nbsp;
                    </span>
                    <p className='my-1 lg:m-0'>All Rights Reserved</p>
                    <span className='hidden lg:inline-block'>
                        &nbsp;|&nbsp;
                    </span>
                    <p>Built by bsik.net | Designed by Lubna Sarigat</p>
                </div>
            </footer>
        </body>
    );
}
