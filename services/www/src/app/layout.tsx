import AppRegistry from '@/components/AppRegistry/AppRegistry';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
  keywords: [ 'VTuber', 'バーチャルYouTuber', '剣城まひる', 'つるぎまひる', 'ファンサイト' ],
  publisher: 'Stardust Sorcery',
  creator: 'Stardust Sorcery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon192.png',
    apple: '/icon192.png',
  },
  openGraph: {
    title: '剣城まひる.fans - 非公式ファンサイト',
    description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
    url: 'https://turugi-mahiru.fans/',
    siteName: '剣城まひる.fans',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://turugi-mahiru.fans/og.png',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '剣城まひる.fans - 非公式ファンサイト',
    description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
    creator: '@mahiru_fans',
    images: [ 'https://turugi-mahiru.fans/og.png' ],
  },
};

export const viewport: Viewport = {
  themeColor: '#fdcf00',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
    >
      <body
      >
        <AppRegistry
        >
          <ThemeRegistry
          >
            {children}
          </ThemeRegistry>
        </AppRegistry>
      </body>
    </html>
  );
}
