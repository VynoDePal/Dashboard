import React from 'react';
import { Post, ViewMode } from '../../types/feed';

interface PostListProps {
  posts: Post[];
  viewMode: ViewMode;
}

const PostList: React.FC<PostListProps> = ({ posts, viewMode }) => {
  return (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {posts.map((post) => (
        <article 
          key={post.id} 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {post.imageUrl && (
            <div className="relative h-48 w-full">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>❤️ {post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>💬 {post.comments.length}</span>
                </button>
              </div>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                Read more
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList;