'use client';

import { useState } from 'react';
import Button from './Button';

export default function RecipeForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
                    body: JSON.stringify({ name, email, form: 'recipe' }),
                }
            );

            const result = await res.json();

            if (result.success) {
                setStatus('Thanks for subscribing!');
                setEmail('');
                setName('');
            } else {
                setStatus(result.message || 'Subscription failed.');
            }
        } catch (err) {
            setStatus('Error connecting to the server.');
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center lg:items-start mb-8'>
                <label htmlFor='recipes-name' className='text-left'>
                    First Name
                </label>
                <input
                    className='mb-4 w-4/5 lg:w-full'
                    id='recipes-name'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor='recipes-email' className='text-left'>
                    Email
                </label>
                <input
                    className='w-4/5 lg:w-full'
                    id='recipes-email'
                    name='recipes-name'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <Button color='yellow' label='Sign up' type='submit' />
            {status && <p className='mt-2 text-base'>{status}</p>}
        </form>
    );
}
