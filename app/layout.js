import './globals.css'

export const metadata = {
  title: 'ふぁいぶの～と - 高品質で少量のコンテンツプラットフォーム',
  description: '月5記事だけ。読むのも月150記事まで。AIに埋もれない、本当に面白いコンテンツとの出会い。クリエイター同士が支え合う商店街型プラットフォーム。',
  keywords: ['コンテンツプラットフォーム', 'クリエイターエコノミー', 'note代替', 'ブレインロット防止', '質の高い記事', '商店街型経済', '少額課金'],
  authors: [{ name: '5' }],
  creator: '5-note',
  publisher: '5-note',
  metadataBase: new URL('https://www.5-note.com'),
  openGraph: {
    title: 'ふぁいぶの～と - 搾り取った原液を飲むように',
    description: '月5記事だけ。AIに埋もれない本当に面白いコンテンツとの出会い',
    url: 'https://www.5-note.com',
    siteName: '5-note',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ふぁいぶの～と - 搾り取った原液を飲むように',
    description: '月5記事だけ。AIに埋もれない本当に面白いコンテンツ',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
        
        {/* 構造化データ（JSON-LD）- LMO対策 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '5-note',
              description: '月5記事だけ。読むのも月150記事まで。AIに埋もれない、本当に面白いコンテンツとの出会い。',
              url: 'https://www.5-note.com',
            }),
          }}
        />
      </body>
    </html>
  );
}