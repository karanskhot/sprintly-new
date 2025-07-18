'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { SendHorizonalIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StorySchema, StoryValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { createStory } from '@/actions/stories';

interface ICreateStoryFormTypes {
  sprintId: string;
  dueDate: Date;
}

const CreateStory = ({ sprintId, dueDate }: ICreateStoryFormTypes) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<StoryValues>({
    resolver: zodResolver(StorySchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: dueDate,
      sprintId
    }
  });
  console.log(errors);
  const onSubmit: SubmitHandler<StoryValues> = async (data) => {
    console.log(`sumitting`);
    console.log(data);
    await createStory(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-full w-full items-center justify-between overflow-hidden rounded-md border-1 hover:border-2 hover:transition-all'
    >
      <Input
        placeholder='Add a story...'
        aria-label='Add a story'
        autoComplete='off'
        spellCheck='false'
        id='title'
        className='h-full w-full rounded-md border-none bg-white shadow-none outline-none focus:border-none focus:ring-0 focus-visible:ring-0 dark:bg-stone-950 dark:text-gray-400 dark:placeholder:text-gray-400'
        {...register('title')}
      />
      <Button type='submit' className='h-full rounded-none'>
        <SendHorizonalIcon />
      </Button>
    </form>
  );
};

export default CreateStory;
