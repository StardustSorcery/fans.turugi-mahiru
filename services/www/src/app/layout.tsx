import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: '剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
    >
      <body
      >
        <ThemeRegistry
        >
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
