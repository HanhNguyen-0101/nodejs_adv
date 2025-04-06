'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Header, Footer } from '@/components/shared';
import { Provider } from 'react-redux';
import store from '@/store';
import LoadingComponent from '@/components/utils/LoadingComponent';
import AlertMessage from '@/components/utils/AlertMessage';

const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC = ({ children }: any) => {
  return (
    <html lang='en'>
      <Provider store={store}>
        <LoadingComponent />
        <AlertMessage />
        <link rel='icon' href='/favicon.png' />
        <body className={inter.className}>
          <Header />
          <main className='flex justify-center flex-col mt-5 w-full'>
            <div className='w-full flex justify-center flex-col items-center ml-0'>
              {children}
            </div>
          </main>

          <Footer />
        </body>
      </Provider>
    </html>
  );
}

export default RootLayout;
