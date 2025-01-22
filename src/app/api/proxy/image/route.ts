import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    if (!url || url.includes('cdn.poe2db.tw')) {
      return new NextResponse('Invalid request', { status: 400 });
    }

    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
      return new NextResponse('Failed to fetch image', { status: imageResponse.status });
    }

    const headers = new Headers(imageResponse.headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Vercel-CDN-Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(imageResponse.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
