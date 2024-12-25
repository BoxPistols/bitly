'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>URL短縮サービス</CardTitle>
        <CardDescription>BitlyのAPIを使用してURLを短縮します</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="短縮したいURLを入力してください"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '短縮中...' : 'URLを短縮'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {shortUrl && (
          <div className="mt-4">
            <p className="font-semibold">短縮されたURL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {shortUrl}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

