import { Sprint, Story } from '@prisma/client';
import { z } from 'zod';
export const StorySchema = z.object({
  title: z
    .string()
    .trim()
    .max(50, 'sprint title too long')
    .min(3, 'sprint title too short'),
  description: z.string().trim().optional().nullable(),
  dueDate: z.date(),
  sprintId: z.string()
});
export type StoryValues = z.infer<typeof StorySchema>;

export const SprintSchema = z.object({
  title: z
    .string()
    .trim()
    .max(100, 'sprint title too long')
    .min(3, 'sprint title too short'),
  description: z.string().trim().optional().nullable(),
  startDate: z.date(),
  stories: z.array(StorySchema)
});

export type SprintValues = z.infer<typeof SprintSchema>;

export type StoryWithMeta = Story; // full story with id, status, etc.
export type SprintWithMeta = Sprint & { stories: Story[] }; // with nested stories
