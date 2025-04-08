import React, { useEffect } from 'react';
import Header from './header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAccountContext } from '@/components/features/account/AccountContext';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { selectedUser } = useAccountContext();
  const handleCtrlS = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      if (!selectedUser) return;
      console.log("Try to save");
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCtrlS);
    return () => {
      window.removeEventListener('keydown', handleCtrlS);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
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
  );
};

export default DefaultLayout;
