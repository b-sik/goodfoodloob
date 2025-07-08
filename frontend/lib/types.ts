import React from 'react';

export interface Post {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    slug: string;
    type: string;
    _embedded: {
        'wp:featuredmedia': [
            {
                source_url: string;
            }
        ];
    };
}

export interface SectionContent {
    children: React.ReactNode;
    imgClass:
        | 'bg-img-about'
        | 'bg-img-special'
        | 'bg-img-recipes'
        | 'bg-img-event'
        | 'bg-img-community';
    imgPosition: 'left' | 'right' | 'center';
}

export type PostType = string | 'posts' | 'recipes' | 'events';
