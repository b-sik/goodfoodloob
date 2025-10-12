import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: 'Missing path' }, { status: 400 });
  }

  try {
    await fetch(`http://goodfoodloob.com${path}`, {
      method: 'PURGE',
    });

    return NextResponse.json({ revalidated: true, now: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ message: 'Revalidation failed', error: err }, { status: 500 });
  }
}
