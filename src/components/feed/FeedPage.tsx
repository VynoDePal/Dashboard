import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedViewToggle from './FeedViewToggle';
import FeedFilterBar from './FeedFilterBar';
import CategoryNav from './CategoryNav';
import PostList from './PostList';
import FeedPagination from './FeedPagination';
import { Post, ViewMode, SortOption, Category } from '../../types/feed';
import { generateMockPosts } from '../../utils/mockFeedData';

const FeedPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(generateMockPosts(50));
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const handleCategoryChange = (category: Category | 'all') => {
    setSelectedCategory(category);
    setCurrentPage(1);
    navigate(category === 'all' ? '/feed' : `/feed/${category}`);
  };

  const filteredPosts = posts
    .filter(post => {
      if (selectedCategory === 'all') return true;
      return post.category === selectedCategory;
    })
    .filter(post => {
      if (!searchQuery) return true;
      return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.content.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return b.comments.length - a.comments.length;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">News Feed</h1>
          <FeedViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>

        <CategoryNav 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <FeedFilterBar
          sortOption={sortOption}
          onSortChange={handleSortChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />

        {paginatedPosts.length > 0 ? (
          <>
            <PostList
              posts={paginatedPosts}
              viewMode={viewMode}
            />
            <FeedPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;