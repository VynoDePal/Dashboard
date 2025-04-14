export type ViewMode = 'grid' | 'list' | 'table';
export type Category = 'product' | 'technical' | 'system';
export type SortOption = 'latest' | 'popular' | 'trending';

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: Category;
  date: string;
  image?: string;
  likes: number;
  comments: Comment[];
  saved: boolean;
}