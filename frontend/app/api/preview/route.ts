import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const PREVIEW_SECRET = process.env.WP_PREVIEW_SECRET;

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

    const draft = await draftMode();
    draft.enable();

    return NextResponse.redirect(new URL(`/blog/${type}/${id}`, req.url));
}
