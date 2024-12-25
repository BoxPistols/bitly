const BITLY_API_ENDPOINT = 'https://api-ssl.bitly.com/v4/shorten';

export async function shortenUrl(longUrl: string, apiKey: string): Promise<string> {
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
    return data.link;
  } catch (error) {
    console.error('エラー:', error);
    throw error;
  }
}

