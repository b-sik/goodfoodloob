import type { Post, PostType } from './types';

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

    console.log(url);
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
    let url = `${API_URL}/${postType}/${id}?_embed`;

    if (fields.length > 0) {
        url += `&_fields=${fields.join(',')}`;
    }

    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);

        const posts = await res.json();
        return posts;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}
