import CreateSprintForm from '@/components/(main)/Forms/Create-Sprint';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create sprint'
};

const CreateSprint = () => {
  return (
    <div className='mx-auto flex w-[90%] flex-col justify-between space-y-4 py-10 md:max-w-3xl'>
      <Card className=''>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold'>
            Create a new Sprint
          </CardTitle>
          <CardDescription className='text-muted-foreground'>
            Fill in the details below to create a new sprint.
          </CardDescription>
          <CardContent className='mt-4'>
            <CreateSprintForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CreateSprint;
