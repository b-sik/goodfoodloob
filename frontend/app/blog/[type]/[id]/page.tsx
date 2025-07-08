import { fetchPost, fetchPosts } from '@/lib/api';
import type { Post } from '@/lib/types';

export async function generateStaticParams() {
    const blogPosts: Post[] = await fetchPosts('posts', 100);
    const recipePosts: Post[] = await fetchPosts('recipes', 100);
    const eventPosts: Post[] = await fetchPosts('events', 100);

    return [...blogPosts, ...recipePosts, ...eventPosts].map((post) => ({
        id: post.id.toString(),
        type: post.type === 'post' ? 'posts' : post.type,
    }));
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{
        id: string;
        type: string;
    }>;
}) {
    const { id, type } = await params;
    const post = await fetchPost(id, type);

    return (
        <main>
            <section>{post?.title.rendered}</section>
        </main>
    );
}
