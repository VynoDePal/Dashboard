import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { PerformanceData } from '../../types/analytics';
import Pagination from '../users/Pagination';

interface PerformanceTableProps {
  data: PerformanceData[];
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof PerformanceData>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const itemsPerPage = 10;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof PerformanceData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm">
      <div className="p-4 border-b-2 border-secondary">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h3 className="text-lg font-medium text-secondary">
            Performance Overview
          </h3>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border-2 border-secondary rounded-md bg-background text-text placeholder:text-text/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary">
          <thead className="bg-secondary/20">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {sortField === 'name' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4 text-secondary" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-secondary" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">
                  Category
                  {sortField === 'category' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4 text-secondary" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-secondary" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('value')}
              >
                <div className="flex items-center">
                  Value
                  {sortField === 'value' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4 text-secondary" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-secondary" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-secondary">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-secondary/10">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text/70">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text/70">
                  {item.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'success'
                        ? 'bg-secondary/20 text-secondary'
                        : item.status === 'warning'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PerformanceTable;