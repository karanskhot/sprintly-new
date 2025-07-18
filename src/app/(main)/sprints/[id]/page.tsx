import { getASprint } from '@/actions/sprints';
import Header from '@/components/(main)/Header';
import SprintDaysColumn from '@/components/(main)/Sprint/SprintDaysColumn';
import SprintDaysSection from '@/components/(main)/Sprint/SprintDaysSection';
import { getDateRange } from '@/lib/utils';

const SprintPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { response } = await getASprint(id);

  if (!response) {
    return <div className=''>Sprint Info Not Fetched!</div>;
  }
  //
  return (
    <div className='h-[calc(100dvh-4rem)] flex-col justify-between space-y-4'>
      <Header title={response.title} />

      <SprintDaysSection
        sprint={response}
        sprintId={response.id}
        stories={response.stories}
      />
    </div>
  );
};

export default SprintPage;
