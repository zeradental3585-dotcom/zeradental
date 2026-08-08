import type { Post } from './posts-types';
import { POSTS_A } from './posts-a';
import { POSTS_B } from './posts-b';
import { POSTS_C } from './posts-c';

export type { Post };

export const POSTS: Post[] = [...POSTS_A, ...POSTS_B, ...POSTS_C].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date)
);

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
