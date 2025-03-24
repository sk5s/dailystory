import { BackendProvider } from '@/BackendContext';
import React from 'react';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <BackendProvider>
      <div className='px-12 py-8'>
        {children}
      </div>
    </BackendProvider>
  );
};

export default DefaultLayout;
