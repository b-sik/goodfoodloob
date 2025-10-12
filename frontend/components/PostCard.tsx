import Link from 'next/link';
import { ubuntuMono, quicksand } from '@/app/fonts';
import { excerpt } from '@/lib/util';
import { Post } from '@/lib/types';

export default function PostCard({
    post,
    size,
}: Readonly<{
    post: Post;
    size?: 'large';
}>) {
    const type = post.type === 'post' ? 'posts' : post.type;

    const hasFeaturedImg = post?._embedded?.['wp:featuredmedia']?.[0]
        ? true
        : false;

    return (
        <li
            key={post.slug}
            className={`border border-gfl-black size-60 sm:size-72 ${
                size === 'large' ? 'md:size-[500px]' : 'md:size-96'
            } rounded-2xl flex`}
            style={
                hasFeaturedImg
                    ? {
                          backgroundImage: `url(${post._embedded['wp:featuredmedia'][0].source_url})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                      }
                    : {}
            }
        >
            <Link
                href={`/blog/${type}/${post.id}`}
                className='size-full group text-center'
            >
                <div
                    className={`flex flex-col bg-gfl-black text-gfl-white rounded-t-2xl ${
                        hasFeaturedImg
                            ? 'group-hover:h-[70%]'
                            : 'size-full rounded-b-2xl'
                    } `}
                >
                    <h1 className={`block p-4 ${quicksand.className}`}>
                        {post.title.rendered}
                    </h1>
                    <div
                        className={`${
                            hasFeaturedImg ? 'hidden group-hover:flex' : 'flex'
                        } flex-col justify-evenly items-center grow mx-4 border-t-[1px] border-gfl-white`}
                    >
                        <p className='text-base mx-4'>
                            {excerpt(post.excerpt.rendered)}...
                        </p>
                        <button
                            className={`uppercase text-xl ${ubuntuMono.className}`}
                        >
                            View Recipe
                        </button>
                    </div>
                </div>
            </Link>
        </li>
    );
}
