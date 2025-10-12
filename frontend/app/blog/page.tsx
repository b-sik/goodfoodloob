import type { Metadata } from 'next';
import { fetchPosts } from '@/lib/api';
import type { Post } from '@/lib/types';
import PostCard from '@/components/PostCard';
import Button from '@/components/Button';
import { excerpt } from '@/lib/util';

export const metadata: Metadata = {
    title: 'Good Food Loob - I like to eat, cook, and talk about good food!',
    description: 'Recipes, events, and insights.',
};

export default async function Blog() {
    const blogPosts: Post[] = await fetchPosts('posts', 4);
    const recipePosts: Post[] = await fetchPosts('recipes', 5);
    const eventPosts: Post[] = await fetchPosts('events', 4);

    return (
        <main>
            <section className='bg-gfl-red text-gfl-white flex flex-col lg:grid lg:grid-cols-2 py-8 min-h-[calc(100vh-80px)] items-center'>
                {recipePosts?.[0] && (
                    <>
                        <div className='flex flex-col justify-center text-center g:text-right max-w-96 justify-self-end lg:pr-20'>
                            <div className='mb-8 lg:mb-16'>
                                <p
                                    className='inline px-4 py-2 rounded-md font-bold text-base'
                                    style={{
                                        background:
                                            'linear-gradient(172.45deg, #7FB3F8 2.81%, #C0B7FA 101.9%)',
                                    }}
                                >
                                    New post!
                                </p>
                            </div>
                            <h1 className='text-4xl mb-8'>
                                {recipePosts[0].title.rendered}
                            </h1>
                            <p className='mb-8 text-lg'>
                                {excerpt(recipePosts[0].excerpt.rendered)}...
                            </p>
                        </div>
                        <div>
                            <PostCard post={recipePosts[0]} size='large' />
                        </div>
                    </>
                )}
            </section>

            <section
                id='recipes'
                className='flex flex-col items-center justify-center bg-gfl-lavendar py-8'
            >
                <div className='flex flex-col lg:flex-row items-center w-3/5 justify-between mb-10'>
                    <h1 className='uppercase text-4xl mb-4 lg:mb-0'>Recipes</h1>
                    <Button color='black' label='View All Recipes' />
                </div>
                <ul className='text-center grid lg:grid-cols-2 gap-8 justify-center'>
                    {recipePosts?.map((post, i) =>
                        i !== 0 ? (
                            <PostCard key={post.slug} post={post} />
                        ) : null
                    )}
                </ul>
            </section>

            <section
                id='events'
                className='flex flex-col items-center justify-center bg-gfl-red py-8'
            >
                <div className='flex flex-col lg:flex-row items-center w-3/5 justify-between mb-10'>
                    <h1 className='uppercase text-4xl text-gfl-white mb-4 lg:mb-0'>
                        Events
                    </h1>
                    <Button color='black' label='View All Events' />
                </div>
                <ul className='text-center grid lg:grid-cols-2 gap-8 justify-center'>
                    {eventPosts?.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </ul>
            </section>

            <section
                id='insights'
                className='flex flex-col items-center justify-center bg-gfl-lavendar py-8'
            >
                <div className='flex flex-col lg:flex-row items-center w-3/5 justify-between mb-10'>
                    <h1 className='uppercase text-4xl mb-4 lg:mb-0'>
                        Insights
                    </h1>
                    <Button color='black' label='View All Posts' />
                </div>
                <ul className='text-center grid lg:grid-cols-2 gap-8 justify-center'>
                    {blogPosts?.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </ul>
            </section>
        </main>
    );
}
