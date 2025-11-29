import { fetchPost, fetchPosts } from '@/lib/api';
import type { Post } from '@/lib/types';
import { humanReadableDate } from '@/lib/util';
import Link from 'next/link';
import { draftMode } from 'next/headers';

export const revalidate = 60;

export async function generateStaticParams() {
    const blogPosts: Post[] = await fetchPosts('posts', 100, ['id', 'type']);
    const recipePosts: Post[] = await fetchPosts('recipes', 100, [
        'id',
        'type',
    ]);
    const eventPosts: Post[] = await fetchPosts('events', 100, ['id', 'type']);

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
    const draft = await draftMode();
    const isPreview = draft.isEnabled;

    const { id, type } = await params;

    let post = await fetchPost(id, type, [
        'title',
        'date_gmt',
        '_embedded',
        'content',
    ]);

    if (isPreview) {
        draft.disable();
    }

    return (
        <main className='blog-post bg-gfl-white'>
            {isPreview && <code>preview mode</code>}
            {post ? (
                <section className='min-h-[calc(100vh-80px)] text-center p-10 md:p-20 flex flex-col justify-center align-middle'>
                    <h1 className='text-5xl'>{post.title.rendered}</h1>
                    <div className='mb-8'>
                        <small>{humanReadableDate(post.date_gmt)}</small> |{' '}
                        <small>
                            <Link
                                href={`/blog/${type}`}
                                className='hover:text-gfl-link-green'
                            >
                                {type}
                            </Link>
                        </small>
                    </div>
                    <div className='max-h-[400px] mb-14'>
                        {post?._embedded?.['wp:featuredmedia']?.[0]
                            ?.source_url ? (
                            <img
                                src={`${post?._embedded['wp:featuredmedia'][0].source_url}`}
                                className='max-h-100 h-[400px] max-w-100 m-auto'
                            />
                        ) : null}
                    </div>
                    <div
                        className='text-left'
                        dangerouslySetInnerHTML={{
                            __html: post?.content.rendered ?? '',
                        }}
                    ></div>
                </section>
            ) : null}
        </main>
    );
}
