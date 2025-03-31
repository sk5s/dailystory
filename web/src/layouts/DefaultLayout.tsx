import { BackendProvider } from '@/BackendContext';
import React from 'react';
import Header from './header';
import { AccountProvider } from '@/components/features/account/AccountContext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <BackendProvider>
      <AccountProvider>
        <div className='h-screen flex flex-col overflow-hidden'>
          <div className='pt-2'>
            <Header />
          </div>
          <div className='flex-1 h-full'>
            <ScrollArea className='h-full'>
              <div className='mx-12 my-8 pb-24'>
                {children}
              </div>
            </ScrollArea>
          </div>
        </div>
      </AccountProvider>
    </BackendProvider>
  );
};

export default DefaultLayout;
