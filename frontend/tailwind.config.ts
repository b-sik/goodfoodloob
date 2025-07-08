import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'gfl-lavendar': '#C0B7FA',
                'gfl-red': '#802A34',
                'gfl-black': '#212121',
                'gfl-white': '#F0F2EF',
                'gfl-green': '#69995D',
                'gfl-link-green': '#A6D3A0',
                'gfl-yellow': '#FDEA72',
                'gfl-deep-purple': '#32213A',
                'gfl-blue': '#104ADE',
                'gfl-pink': '#FF33C6',
            },
        },
    },
    plugins: [],
    safelist: [
        'bg-gfl-green',
        'bg-gfl-yellow',
        'bg-gfl-black',
        'bg-img-about',
        'bg-img-special',
        'bg-img-recipes',
        'bg-img-event',
        'bg-img-community',
        'bg-center',
        'bg-left',
        'bg-right',
    ],
} satisfies Config;
