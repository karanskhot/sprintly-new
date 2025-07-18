import { AppSidebar } from '@/components/(main)/Sidebar/App-Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full leading-tight antialiased'>{children}</main>
    </SidebarProvider>
  );
};

export default MainLayout;
