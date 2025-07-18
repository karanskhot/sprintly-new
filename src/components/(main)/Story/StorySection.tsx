'use client';
import React, { Suspense } from 'react';
import StoryCard from './StoryCard';
import { SprintWithMeta } from '@/lib/validations';

interface IStorySectionType {
  data: SprintWithMeta;
}
const StorySection = ({ data }: IStorySectionType) => {
  return (
    <div className='h-full space-y-2 overflow-y-auto px-2'>
      <Suspense fallback='suspense...'>
        <StoryCard data={data.stories} />
      </Suspense>
    </div>
  );
};

export default StorySection;
