import { Post, Category } from '../types/feed';

const categories: Category[] = ['product', 'technical', 'system'];

const sampleImages = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
  'https://images.unsplash.com/photo-1579403124614-197f69d8187b',
];

export const generateMockPosts = (count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    title: `Sample Post ${i + 1}`,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      name: `Author ${i + 1}`,
      avatar: `https://i.pravatar.cc/150?u=author${i + 1}`,
    },
    category: categories[Math.floor(Math.random() * categories.length)],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    image: Math.random() > 0.5 ? sampleImages[Math.floor(Math.random() * sampleImages.length)] : undefined,
    likes: Math.floor(Math.random() * 1000),
    comments: Array.from({ length: Math.floor(Math.random() * 10) }, (_, j) => ({
      id: `comment-${i}-${j}`,
      author: `Commenter ${j + 1}`,
      content: 'Sample comment content',
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    })),
    saved: Math.random() > 0.8,
  }));
};