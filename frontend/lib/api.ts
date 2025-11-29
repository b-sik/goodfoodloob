import type { Post, PostType } from './types';
import { draftMode } from 'next/headers';

const API_URL = process.env.API_URL;

export async function fetchPosts(
    postType: PostType,
    perPage: number = 10,
    fields: string[] = []
): Promise<Post[]> {
    let url = `${API_URL}/${postType}?_embed&per_page=${perPage}`;

    if (fields.length > 0) {
        url += `&_fields=${fields.join(',')}`;
    }

    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);

        const posts = await res.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function fetchPost(
    id: string,
    postType: PostType = 'posts',
    fields: string[] = []
): Promise<Post | null> {
    const { isEnabled } = await draftMode();

    let url = `${API_URL}/${postType}/${id}?_embed`;

    // const headers: HeadersInit = {
    //     'Content-Type': 'application/json',
    // };

    if (fields.length > 0) {
        url += `&_fields=${fields.join(',')}`;
    }

    if (isEnabled) {
        url += '&status=any';

        // const auth = Buffer.from(
        //     `${process.env.PREVIEW_USER}:${process.env.PREVIEW_PASSWORD}`
        // ).toString('base64');
        // headers['Authorization'] = `Basic ${auth}`;
    }

    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);

        const post = await res.json();
        return post;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}
