import type { Post, PostType } from './types';

const API_URL = process.env.API_URL;

export async function fetchPosts(
    postType: PostType,
    perPage: number = 10
): Promise<Post[]> {
    try {
        const res = await fetch(
            `${API_URL}/${postType}?_embed&per_page=${perPage}`
        );

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
    postType: PostType = 'posts'
): Promise<Post | null> {
    try {
        const res = await fetch(`${API_URL}/${postType}/${id}`);

        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);

        const posts = await res.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return null;
    }
}
