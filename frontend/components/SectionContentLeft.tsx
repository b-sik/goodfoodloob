import { SectionContent } from '@/lib/types';

export default function SectionContentLeft({
    children,
    imgClass,
    imgPosition,
}: Readonly<SectionContent>) {
    return (
        <section className='flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-80px)] items-stretch snap-end'>
            <div className='section-children-wrapper bg-gfl-red lg:pr-20 flex-1 flex flex-col justify-center items-center lg:items-end text-gfl-white text-center lg:text-left'>
                {children}
            </div>
            <div
                className={`${imgClass} bg-cover bg-${imgPosition} hidden lg:block`}
            ></div>
        </section>
    );
}
