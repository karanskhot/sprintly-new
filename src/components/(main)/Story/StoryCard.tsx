'use client';
import { StoryValues } from '@/lib/validations';
import { DateTime } from 'luxon';
import React from 'react';

interface IStoryCard {
  data: StoryValues[];
}

const StoryCard = ({ data }: IStoryCard) => {
  if (data?.length === 0) return null;
  console.log(DateTime.now().toLocaleString());
  const filtered = data.filter((story) => {
    console.log(story.dueDate.toLocaleDateString());
    console.log(new Date().toLocaleDateString());
    return (
      story.dueDate.toLocaleDateString() === new Date().toLocaleDateString()
    );
  });
  console.log(filtered);
  return (
    <>
      {filtered.map((story, index) => (
        <div className='min-h-16 rounded-md border shadow' key={index}>
          {/* You can map over data here if needed */}

          <div className='p-2'>
            <h1>{story.title}</h1>
            <p>{story.dueDate.toString()}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default StoryCard;
