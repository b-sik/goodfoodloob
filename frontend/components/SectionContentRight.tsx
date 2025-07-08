import { SectionContent } from '@/lib/types';

export default function SectionContentRight({
    children,
    imgClass,
    imgPosition,
}: Readonly<SectionContent>) {
    return (
        <section
            className={`flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-80px)] ${imgClass} bg-cover bg-right lg:bg-none items-stretch snap-end`}
        >
            <div
                className={`hidden lg:block ${imgClass} bg-cover bg-${imgPosition}`}
            ></div>
            <div className='section-children-wrapper lg:pl-20 flex lg:flex-col justify-center items-center lg:items-start bg-gfl-lavendar/80 text-gfl-black text-center lg:text-left flex-1'>
                {children}
            </div>
        </section>
    );
}
