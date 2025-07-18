'use server';
import { db } from '@/lib/db';
import { getUserSession } from '@/lib/getUserSession';
import { apiResponseObject } from '@/lib/utils';
import { StoryValues } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';
import { Status } from '@prisma/client';
import { DateTime } from 'luxon';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createStory = async (data: StoryValues) => {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }
  const isSprintValid = await db.sprint.findFirst({
    where: { userId, id: data.sprintId }
  });
  if (!isSprintValid) {
    throw Error(`wrong task wrong story`);
  }
  const new_story_data = {
    title: data.title,
    description: data.description,
    status: isSprintValid.status,
    dueDate: data.dueDate,
    userId,
    sprintId: data.sprintId
  };
  console.log(new_story_data);
  await db.story.create({
    data: new_story_data
  });

  revalidatePath('/today');
  try {
  } catch (error) {
    console.log(error);
  }
};
