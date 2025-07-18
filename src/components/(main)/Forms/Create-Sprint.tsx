'use client';
import React, { useState } from 'react';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SprintSchema, SprintValues, StorySchema } from '@/lib/validations';
import { DateTime } from 'luxon';
// import { createNewSprint } from '@/actions/sprints';
import { toast } from 'sonner';
import { createNewSprint } from '@/actions/sprints';

const CreateSprintForm = () => {
  const [open, setOpen] = useState(false);
  const [date] = useState<Date | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<SprintValues>({
    resolver: zodResolver(SprintSchema),
    defaultValues: {
      title: '',
      startDate: DateTime.utc().toJSDate(),
      description: '',
      stories: []
    }
  });

  console.log(errors);
  const selected_due_date = watch('startDate');
  const onSubmit: SubmitHandler<SprintValues> = async (data) => {
    const { message, success } = await createNewSprint(data);
    if (success) {
      toast.success(message);
      reset();
    } else {
      toast.error(message);
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
      <div className='space-y-1'>
        <Label className='text-lg font-medium'>Title</Label>
        <Input placeholder='e.x: sprint-01' {...register('title')} />
      </div>
      <div className='flex w-full items-center justify-between space-y-1'>
        <div className='space-y-1'>
          <Label className='text-lg font-medium'>Start Date</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                id='date'
                className='w-full cursor-pointer'
              >
                {selected_due_date ? (
                  DateTime.fromJSDate(selected_due_date).toFormat(
                    'MMM dd, yyyy'
                  )
                ) : (
                  <CalendarIcon />
                )}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto overflow-hidden p-0'
              align='start'
            >
              <Calendar
                mode='single'
                defaultMonth={date}
                numberOfMonths={1}
                selected={selected_due_date}
                captionLayout='dropdown'
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                onSelect={(date) => {
                  if (date) {
                    setValue('startDate', date);
                    setOpen(false);
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='space-y-1'>
          <Label className='text-lg font-medium'>End Date</Label>
          <Button
            type='button'
            className='cursor-not-allowed'
            variant={'secondary'}
          >
            {DateTime.fromJSDate(selected_due_date)
              .plus({ days: 6 })
              .toFormat('MMM dd, yyyy')}
          </Button>
        </div>
      </div>
      <div className='space-y-1'>
        <Label className='text-lg font-medium'>Description</Label>
        <Textarea
          {...register('description')}
          placeholder='write your plans for upcoming week briefly'
        />
      </div>
      <div className='mt-2 flex w-1/2 gap-4 space-y-1'>
        <Button
          variant={'destructive'}
          onClick={() => reset()}
          type='reset'
          className='w-full'
        >
          Cancel
        </Button>
        <Button variant={'default'} type='submit' className='w-full'>
          Create Sprint
        </Button>
      </div>
    </form>
  );
};

export default CreateSprintForm;
