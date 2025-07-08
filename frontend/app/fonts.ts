import { Yeseva_One, Quicksand, Ubuntu_Mono } from 'next/font/google';

export const yesevaOne = Yeseva_One({
    variable: '--font-yeseva-one',
    weight: '400',
    subsets: ['latin'],
});

export const quicksand = Quicksand({
    variable: '--font-quicksand',
    weight: ['300', '400', '600'],
    subsets: ['latin'],
});

export const ubuntuMono = Ubuntu_Mono({
    variable: '--font-ubuntu-mono',
    weight: '400',
    subsets: ['latin'],
});
