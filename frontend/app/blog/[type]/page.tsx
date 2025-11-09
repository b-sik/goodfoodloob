import type { Metadata } from 'next';
import { POST_TYPES } from '@/lib/constants';
import { PostType, Post } from '@/lib/types';
import { fetchPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Button from '@/components/Button';

export const metadata: Metadata = {
    title: 'Good Food Loob - I like to eat, cook, and talk about good food!',
    description: 'Recipes, events, and insights.',
};

export async function generateStaticParams() {
    return POST_TYPES.map((type) => ({
        type,
    }));
}

export default async function Blog({
    params,
}: {
    params: Promise<{
        type: PostType;
    }>;
}) {
    const { type } = await params;

    const posts: Post[] = await fetchPosts(type, 100, [
        'id',
        'title',
        'type',
        'slug',
        'excerpt',
        '_embedded',
        '_links',
    ]);

    return (
        <main>
            <section
                id='recipes'
                className='flex flex-col items-center justify-center bg-gfl-lavendar py-8'
            >
                <div className='flex flex-col text-center lg:flex-row items-center w-3/5 mb-10'>
                    <h1 className='uppercase text-4xl mb-4 lg:mb-0'>{type}</h1>
                </div>
                <ul className='text-center grid lg:grid-cols-2 gap-8 justify-center'>
                    {posts?.map((post, i) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </ul>
            </section>
        </main>
    );
}
