import React from 'react';
import { Category } from '../../types/feed';

interface CategoryNavProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All Posts' },
    { value: 'product', label: 'Product' },
    { value: 'technical', label: 'Technical' },
    { value: 'system', label: 'System' },
  ];

  return (
    <nav className="flex space-x-2 overflow-x-auto pb-2">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onCategoryChange(value)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
            transition-colors duration-200
            ${selectedCategory === value
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNav;