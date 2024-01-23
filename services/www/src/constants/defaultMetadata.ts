import { Metadata } from "next";

const defaultMetadata: Metadata = {
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
    siteName: '剣城まひる.fans',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://turugi-mahiru.fans/og.png',
        width: 1528,
        height: 800,
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

export default defaultMetadata;
