import AppRegistry from '@/components/AppRegistry/AppRegistry';
import SnackbarRegistry from '@/components/SnackbarRegistry/SnackbarRegistry';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import defaultMetadata from '@/constants/defaultMetadata';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
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
        <SnackbarRegistry
        >
          <AppRegistry
          >
            <ThemeRegistry
            >
              {children}
            </ThemeRegistry>
          </AppRegistry>
        </SnackbarRegistry>
      </body>
    </html>
  );
}
