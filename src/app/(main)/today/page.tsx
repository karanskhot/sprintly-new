import { getActiveSprint } from '@/actions/sprints';
import CreateStory from '@/components/(main)/Forms/Create-Story';
import Header from '@/components/(main)/Header';
import StorySection from '@/components/(main)/Story/StorySection';
import HeaderCard from '@/components/(main)/Today/HeaderCard';
import WelcomeText from '@/components/(main)/Today/WelcomeText';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SprintValues, SprintWithMeta } from '@/lib/validations';
import { DateTime } from 'luxon';
import React, { Suspense } from 'react';

const Today = async () => {
  const { response } = await getActiveSprint();
  return (
    <div className='flex-col justify-between'>
      <Header title='today' />
      <section className='mx-auto flex max-w-lg flex-col space-y-3 p-2 md:max-w-3xl md:px-0'>
        <WelcomeText name='Karan' />
        <div className='grid grid-cols-3 gap-3'>
          <HeaderCard top='Thu' center='16' bottom='July' />
          <HeaderCard top='Thu' center='16' bottom='July' />
          <HeaderCard top='Thu' center='16' bottom='July' />
        </div>

        {response ? (
          <div className='flex h-[550px] w-full flex-col space-y-2 overflow-y-auto'>
            <div className='sticky bottom-0 h-12'>
              <CreateStory dueDate={new Date()} sprintId={response.id} />
            </div>
            <Suspense fallback='suspenseee....'>
              <RenderActiveSprintSection response={response!} />
            </Suspense>
          </div>
        ) : (
          <div>No Sprints</div>
        )}
      </section>
    </div>
  );
};

export default Today;

interface IRenderActiveSprintSectionType {
  response: SprintWithMeta;
}
const RenderActiveSprintSection = async ({
  response
}: IRenderActiveSprintSectionType) => {
  return <StorySection data={response} />;
};
