'use client';

import { useState } from 'react';
import Button from './Button';

export default function ContactForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
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
                    body: JSON.stringify({
                        name,
                        email,
                        message,
                        form: 'contact',
                    }),
                }
            );

            const result = await res.json();

            if (result.success) {
                setStatus('Thanks for your message!');
                setEmail('');
                setName('');
                setMessage('');
            } else {
                setStatus(result.message || 'Message failed.');
            }
        } catch (err) {
            setStatus('Error connecting to the server.');
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor='message-name'>Name</label>
            <input
                id='message-name'
                name='name'
                className='mb-4'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label htmlFor='message-email'>Email</label>
            <input
                id='message-email'
                name='email'
                className='mb-4'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor='message-content'>Message</label>
            <textarea
                id='message-content'
                name='message'
                className='mb-4 resize-none'
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <Button color='black' label='Send message' type='submit' />
            {status && <p className='mt-2 text-base'>{status}</p>}
        </form>
    );
}
