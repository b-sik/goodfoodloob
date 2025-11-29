import { fetchPost } from '@/lib/api';
import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const PREVIEW_SECRET = process.env.PREVIEW_SECRET;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (secret !== PREVIEW_SECRET) {
        return NextResponse.json(
            { message: 'Invalid secret' },
            { status: 401 }
        );
    }

    if (!id) {
        return NextResponse.json(
            { message: 'Missing Post ID' },
            { status: 400 }
        );
    }

    if (!type) {
        return NextResponse.json(
            { message: 'Missing post type.' },
            { status: 400 }
        );
    }

    const post = await fetchPost(id, type);

    if (!post) {
        return NextResponse.json(
            { message: 'Post does not exist.' },
            { status: 400 }
        );
    }

    const draft = await draftMode();
    draft.enable();

    return NextResponse.redirect(`/blog/${type}/${id}`);
}
