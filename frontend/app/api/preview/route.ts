import { fetchPost } from '@/lib/api';
import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    let type = searchParams.get('type');
    const id = searchParams.get('id');

    if (secret !== process.env.PREVIEW_SECRET) {
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
            { message: 'Missing post type' },
            { status: 400 }
        );
    }

    const draft = await draftMode();
    draft.enable();

    const post = await fetchPost(id, type, ['id'], true);

    if (!post) {
        return NextResponse.json(
            { message: 'Post does not exist.' },
            { status: 400 }
        );
    }

    return NextResponse.redirect(`${process.env.FE_URL}/blog/${type}/${id}`);
}
