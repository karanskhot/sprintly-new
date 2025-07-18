'use client';

import { SprintWithMeta, StoryValues } from '@/lib/validations';
import SprintDaysCard from './SprintDaysColumn';
import { getDateRange } from '@/lib/utils';

interface ISprintSectionTypes {
  sprintId: string;
  sprint: SprintWithMeta;
  stories: StoryValues[];
}
const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const SprintDaysSection = ({
  sprint,
  sprintId,
  stories
}: ISprintSectionTypes) => {
  const days = getDateRange(sprint.startDate, sprint.endDate, userTz);
  console.log(days);
  return (
    <section className='flex h-[85%] items-start gap-4 overflow-x-auto py-2'>
      {days.map((day) => (
        <SprintDaysCard
          sprint={sprint}
          key={day.fullDate}
          day={day.day}
          dateTime={new Date(day.time_full)}
        />
      ))}
    </section>
  );
};

export default SprintDaysSection;
