'use client';
import CreateStory from '../Forms/Create-Story';
import { ArchiveXIcon, CircleSmallIcon } from 'lucide-react';
import { SprintWithMeta } from '@/lib/validations';

import { useMemo } from 'react';

interface ISprintDaysColumn {
  sprint: SprintWithMeta;
  day: string;
  dateTime: Date;
  // sprintId: string;
}
const SprintDaysColumn = ({ sprint, day, dateTime }: ISprintDaysColumn) => {
  const filteredOnDays = useMemo(() => {
    return sprint.stories.filter(
      (story) =>
        new Date(story.dueDate).toDateString() ===
        new Date(dateTime).toDateString()
    );
  }, [sprint.stories, dateTime]);
  return (
    <div className='h-full w-[90%] flex-none overflow-hidden rounded-2xl border shadow md:w-2/3 lg:w-1/2 xl:w-1/4'>
      <div className='flex h-[8%] items-center justify-center py-4 shadow-2xl'>
        <div>
          <h2>{day}</h2>
          <h1>{new Date(dateTime).toLocaleString()}</h1>
        </div>
      </div>
      <div className='flex h-[92%] flex-col justify-between space-y-2'>
        <div className='h-[92%] space-y-4 overflow-y-auto p-2'>
          {filteredOnDays.map((story) => (
            <div
              className='min-h-12 rounded-md border p-2 shadow'
              key={story.id}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <span>
                    <CircleSmallIcon strokeWidth={1.0} />
                  </span>
                  <p className=''>{story.title}</p>
                </div>
                <div className=''>
                  <ArchiveXIcon size={15} />
                </div>
              </div>
              <p>{story.dueDate.toString()}</p>
            </div>
          ))}
        </div>
        <div className='h-[10%] bg-transparent p-2 shadow-2xl'>
          <CreateStory dueDate={dateTime} sprintId={sprint.id} />
        </div>
      </div>
    </div>
  );
};

export default SprintDaysColumn;
