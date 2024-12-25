import { NextResponse } from 'next/server';

const BITLY_API_ENDPOINT = 'https://api-ssl.bitly.com/v4/shorten';

export async function POST(request: Request) {
  const { longUrl } = await request.json();
  const apiKey = process.env.BITLY_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'Bitly APIキーが設定されていません' }, { status: 500 });
  }

  try {
    const response = await fetch(BITLY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ long_url: longUrl }),
    });

    if (!response.ok) {
      throw new Error('URLの短縮に失敗しました');
    }

    const data = await response.json();
    return NextResponse.json({ shortUrl: data.link });
  } catch (error) {
    console.error('エラー:', error);
    return NextResponse.json({ error: 'URLの短縮中にエラーが発生しました' }, { status: 500 });
  }
}

