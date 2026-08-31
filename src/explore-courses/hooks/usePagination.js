import { useState, useCallback } from 'react';

import { DEFAULT_PAGE_INDEX } from '../data/constants';

/**
 * Custom hook for managing pagination state in the DataTable.
 */
export const usePagination = () => {
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  const handlePageChange = useCallback((newPageIndex) => {
    setPageIndex(newPageIndex);
  }, []);

  const resetPagination = useCallback(() => {
    setPageIndex(DEFAULT_PAGE_INDEX);
  }, []);

  return {
    pageIndex,
    handlePageChange,
    resetPagination,
  };
};
