'use client';

import { useState } from 'react';
import Button from './Button';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(
                'https://goodfoodloob.com/wp-json/gfl/v1/subscribe',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, form: 'newsletter' }),
                }
            );

            const result = await res.json();

            if (result.success) {
                setStatus('Thanks for subscribing!');
                setEmail('');
            } else {
                setStatus(result.message || 'Subscription failed.');
            }
        } catch (err) {
            setStatus('Error connecting to the server.');
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor='newsletter-email' className='font-semibold'>
                Subscribe to my newsletter
            </label>
            <div className='flex flex-col lg:flex-row items-center'>
                <input
                    id='newsletter-email'
                    name='email'
                    type='email'
                    className='w-4/5 lg:w-full mb-4 mt-2 lg:my-0'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    required
                />
                <Button
                    color='yellow'
                    label='Subscribe'
                    type='submit'
                    extraClasses='ml-4'
                />
            </div>

            {status && <p className='mt-2 text-base'>{status}</p>}
        </form>
    );
}
