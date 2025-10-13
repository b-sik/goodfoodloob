import type { Metadata } from 'next';
import Button from '@/components/Button';
import RecipeForm from '@/components/RecipeForm';
import EventForm from '@/components/EventForm';
import { fetchPosts } from '@/lib/api';
import type { Post } from '@/lib/types';
import { excerpt } from '@/lib/util';
import Image from 'next/image';
import SectionContentRight from '@/components/SectionContentRight';
import SectionContentLeft from '@/components/SectionContentLeft';

export const metadata: Metadata = {
    title: 'Good Food Loob - I like to eat, cook, and talk about good food!',
    description: 'Recipes, events, and insights.',
};

export default async function Home() {
    const recipePost: Post[] = await fetchPosts('recipes', 1);
    const eventPost: Post[] = await fetchPosts('events', 1);

    return (
        <>
            <main>
                <SectionContentRight
                    imgClass='bg-img-about'
                    imgPosition='right'
                >
                    <div className='max-w-96 text-center lg:text-left'>
                        <h1 className='text-6xl text-gfl-red'>Hi!</h1>
                        <h1 className='text-6xl mb-8 text-gfl-red'>
                            I&apos;m Lubna,
                        </h1>
                        <p className='mb-8'>
                            I like to eat, cook, & talk about good food!
                        </p>
                        <p className='mb-8'>
                            I started this blog to share my love of food and
                            build a community through it.
                        </p>
                        <p className='mb-8'>
                            I can help you cook delicious food, or cook for you.
                            Either way, let&apos;s eat some good food together!
                        </p>
                    </div>
                </SectionContentRight>

                <SectionContentLeft
                    imgClass='bg-img-special'
                    imgPosition='center'
                >
                    <div className='max-w-96 flex flex-col items-center lg:items-start'>
                        <h1 className='text-6xl mb-8 text-gfl-lavendar uppercase'>
                            Today&apos;s Special
                        </h1>
                        <Image
                            src='/special.jpg'
                            width={300}
                            height={500}
                            alt='Delicious food'
                            className='lg:hidden rounded-2xl mb-8'
                        />
                        {recipePost?.[0] && (
                            <>
                                <h2 className='text-4xl mb-8'>
                                    {recipePost[0].title.rendered}
                                </h2>
                                <p className='mb-8'>
                                    {excerpt(recipePost[0].excerpt.rendered)}...
                                </p>
                            </>
                        )}
                        color='green' label='View recipe' href='/blog#recipes'
                    </div>
                </SectionContentLeft>

                <SectionContentRight
                    imgClass='bg-img-recipes'
                    imgPosition='center'
                >
                    <div className='max-w-96'>
                        <h1 className='text-6xl text-gfl-red uppercase'>Get</h1>
                        <h1 className='text-6xl text-gfl-red uppercase mb-8'>
                            Recipes
                        </h1>
                        <p className='mb-8'>
                            Curated with love and delivered to your inbox
                            monthly; each recipe is inspired by seasons, and my
                            desire to replace store-bought with homemade.
                        </p>
                        <RecipeForm />
                    </div>
                </SectionContentRight>

                <SectionContentLeft
                    imgClass='bg-img-event'
                    imgPosition='center'
                >
                    <div className='max-w-96 flex flex-col items-center lg:items-start'>
                        <h1 className='text-6xl mb-8 uppercase text-gfl-lavendar'>
                            Upcoming Event
                        </h1>
                        <Image
                            src='/event.jpg'
                            width={300}
                            height={500}
                            alt='Delicious food'
                            className='lg:hidden rounded-2xl mb-8'
                        />
                        {eventPost?.[0] && (
                            <>
                                <h2 className='text-4xl mb-8'>
                                    {eventPost[0].title.rendered}
                                </h2>
                                <p className='mb-8'>
                                    {excerpt(eventPost[0].excerpt.rendered)}
                                    ...
                                </p>
                            </>
                        )}
                        <Button
                            color='green'
                            label='View event'
                            href='/blog#events'
                        />
                    </div>
                </SectionContentLeft>

                <SectionContentRight
                    imgClass='bg-img-community'
                    imgPosition='center'
                >
                    <div className='max-w-96'>
                        <h1 className='text-6xl uppercase text-gfl-red mb-8'>
                            Join the Community
                        </h1>
                        <p className='mb-8'>
                            Receive invites to workshops, social gatherings, and
                            all kinds of fun events where food is at the centre
                            of the table.
                        </p>
                        <EventForm />
                    </div>
                </SectionContentRight>
            </main>
        </>
    );
}
