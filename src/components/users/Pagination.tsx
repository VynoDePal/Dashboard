import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-background text-text sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border-2 border-secondary bg-background px-4 py-2 text-sm font-medium text-text hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary dark:bg-secondary/50 dark:border-secondary dark:text-text dark:hover:bg-secondary/40"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border-2 border-secondary bg-background px-4 py-2 text-sm font-medium text-text hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary dark:bg-secondary/50 dark:border-secondary dark:text-text dark:hover:bg-secondary/40"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-text">
            Showing page <span className="font-medium text-secondary">{currentPage}</span> of{' '}
            <span className="font-medium text-secondary">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md border-2 border-secondary bg-background px-2 py-2 text-secondary hover:bg-secondary/20 focus:z-20 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed dark:border-secondary dark:bg-secondary/50 dark:text-text dark:hover:bg-secondary/40"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5 text-secondary" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === currentPage
                    ? 'z-10 bg-primary text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                    : 'border-2 border-secondary bg-background text-text hover:bg-secondary/20 focus:z-20 focus:outline-none focus:ring-2 focus:ring-primary dark:text-text dark:border-secondary dark:hover:bg-secondary/40'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md border-2 border-secondary bg-background px-2 py-2 text-secondary hover:bg-secondary/20 focus:z-20 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed dark:border-secondary dark:bg-secondary/50 dark:text-text dark:hover:bg-secondary/40"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5 text-secondary" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;