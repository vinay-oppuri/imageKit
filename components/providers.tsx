'use client';

import { SessionProvider } from 'next-auth/react';
import { IKContext } from 'imagekitio-react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import ThemeToaster from './themeToaster';

interface ProvidersProps {
  children: React.ReactNode;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!urlEndpoint) {
  throw new Error('Missing NEXT_PUBLIC_URL_ENDPOINT environment variable');
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <IKContext urlEndpoint={urlEndpoint}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
          <ThemeToaster/>
        </NextThemesProvider>
      </IKContext>
    </SessionProvider>
  );
}
