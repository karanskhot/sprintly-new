import {
  CalendarDaysIcon,
  Hash,
  ListCheckIcon,
  PlusIcon,
  TargetIcon
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export async function AppSidebar() {
  //   const { response } = await getAllSprints();
  return (
    <Sidebar side='left' variant='sidebar' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href={'/today'} className='text-2xl'>
              Remindly.ai
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='!mt-10 space-y-4'>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={'/today'}>
                    <span className='text-green-700'>
                      <TargetIcon size={22} />
                    </span>
                    <span className='text-base font-semibold'>Today</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className=''>
                <SidebarMenuButton asChild>
                  <Link href={'/today'} className='flex items-center gap-2'>
                    <span className='text-fuchsia-700'>
                      <ListCheckIcon size={20} />
                    </span>
                    <span className='text-base font-semibold'>
                      All my stories
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={'/create-sprint'}>
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <CalendarDaysIcon size={20} />
                        <span className='text-base font-semibold'>Sprints</span>
                      </div>
                      <PlusIcon size={20} />
                    </div>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub className=''>
                  <SidebarMenuSubItem className=''>
                    <SidebarMenuSubButton asChild className='h-auto py-1'>
                      <Link
                        href={`/sprints/cmd7uj4df00048c8y297q3ak3`}
                        className='flex items-center gap-2'
                      >
                        active sprint
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={'/today'}>
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <Hash size={20} />
                        <span className='text-base font-semibold'>
                          Hashtags
                        </span>
                      </div>
                      <PlusIcon size={20} />
                    </div>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub className=''>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <span>#banana</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className=''>
            <UserButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
