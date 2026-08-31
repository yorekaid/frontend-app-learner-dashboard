import { useCallback } from 'react';

import { DEFAULT_PAGE_INDEX } from '../data/constants';
import { useSearch } from './useSearch';
import { useFilter } from './useFilter';
import { usePagination } from './usePagination';
import { useCourseData } from './useCourseData';

/**
 * Main catalog hook that orchestrates all catalog functionality.
 */
export const useCatalog = ({
  fetchData,
  courseData,
  isFetching,
  searchParams,
  setSearchParams,
}) => {
  const {
    hasInitializedFromUrl,
    urlSearchQuery,
    searchString,
    handleSearch,
  } = useSearch({
    fetchData, isFetching, searchParams, setSearchParams,
  });

  const { filterState, resetFilterProgress, handleFilterChange } = useFilter();

  const { pageIndex, handlePageChange, resetPagination } = usePagination();

  const { previousCourseData } = useCourseData({
    courseData,
    searchString,
  });

  const handleFetchData = useCallback((params) => {
    const { pageIndex: newPageIndex, filters: newFilters } = params;

    const filterChanged = handleFilterChange(newFilters, fetchData, searchString);

    if (filterChanged) {
      resetPagination();
      return;
    }

    handlePageChange(newPageIndex ?? DEFAULT_PAGE_INDEX);
    fetchData({ ...params, searchString });
  }, [handleFilterChange, fetchData, searchString, resetPagination, handlePageChange]);

  return {
    pageIndex,
    filterState,
    searchString,
    hasInitializedFromUrl,
    urlSearchQuery,
    previousCourseData,
    handleSearch,
    handleFetchData,
    resetFilterProgress,
  };
};
