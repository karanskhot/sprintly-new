'use server';

import { db } from '@/lib/db';
import { getUserSession } from '@/lib/getUserSession';
import { apiResponseObject } from '@/lib/utils';
import { SprintValues } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';
import { Status } from '@prisma/client';
import { DateTime } from 'luxon';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createNewSprint = async (data: SprintValues) => {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }
  try {
    const today = DateTime.local();
    let status;
    const userTimezone = DateTime.fromJSDate(data.startDate).toLocal();
    if (today.hasSame(userTimezone, 'day')) {
      status = Status.Active;
    } else if (today.diff(userTimezone, 'day').days < 0) {
      status = Status.Scheduled;
    } else {
      status = Status.Expired;
    }
    const endDate = DateTime.fromJSDate(data.startDate)
      .plus({ days: 6 })
      .toJSDate();

    const isOverlapping = await db.sprint.findFirst({
      where: {
        userId,
        AND: [
          { startDate: { lte: endDate } },
          { endDate: { gte: data.startDate } }
        ]
      }
    });

    if (isOverlapping) {
      return {
        success: false,
        message: 'Sprint overlaps with an existing sprint.',
        response: null
      };
    }

    const response = await db.sprint.create({
      data: {
        title: data.title,
        description: data.description!,
        startDate: data.startDate,
        endDate: endDate,
        status,
        userId
      }
    });
    revalidatePath('/today');
    return apiResponseObject({
      message: 'sprint created successfully.',
      response,
      success: true
    });
  } catch (error) {
    console.log(error);
    return apiResponseObject({
      message: 'oops.. something went wrong',
      response: null,
      success: false
    });
  }
};

export const getASprint = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }
  try {
    const response = await db.sprint.findFirst({
      where: {
        userId,
        id
      },
      include: {
        stories: true
      }
    });
    return apiResponseObject({ success: true, message: '', response });
  } catch (error) {}
  return apiResponseObject({
    success: false,
    message: 'oops...server-error',
    response: null
  });
};

export const getActiveSprint = async () => {
  const userId = await getUserSession();
  try {
    const response = await db.sprint.findFirst({
      where: {
        userId,
        status: 'Active'
      },
      include: {
        stories: true
      }
    });
    return apiResponseObject({
      success: true,
      message: 'active sprint fetched',
      response
    });
  } catch (error) {
    console.log(error);
    return apiResponseObject({
      success: false,
      message: 'oops .. active sprint fetched',
      response: null
    });
  }
};
