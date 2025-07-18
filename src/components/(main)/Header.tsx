import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';

const Header = ({ title }: { title: string }) => {
  return (
    <header className='bg-secondary sticky top-0 z-50 flex h-12 items-center space-x-1 border-b py-2'>
      <SidebarTrigger className='sticky top-2' />
      <p className='font-semibold capitalize'>{title}</p>
    </header>
  );
};

export default Header;
