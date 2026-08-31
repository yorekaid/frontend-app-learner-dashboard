import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

import { fetchCourseListSearch } from '../data/api';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from '../data/constants';
import { transformDataTableFilters } from '../data/utils';

/**
 * A React Query hook that fetches course list search data.
 */
export const useCourseListSearch = ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageIndex = DEFAULT_PAGE_INDEX,
  enableCourseSortingByStartDate = false,
  filters = {},
  searchString = '',
} = {}) => {
  const [params, setParams] = useState({
    pageSize,
    pageIndex,
    enableCourseSortingByStartDate,
    filters,
    searchString,
  });

  const {
    data, isLoading, isError, error, isFetching,
  } = useQuery({
    queryKey: ['courseListSearch', params],
    queryFn: () => fetchCourseListSearch(params),
    placeholderData: (previousData) => previousData,
  });

  /**
   * Updates query params and triggers data refetch if params have changed.
   */
  const fetchData = useCallback((newParams) => {
    const transformedFilters = transformDataTableFilters(newParams.filters);

    const transformedParams = {
      pageSize: newParams.pageSize,
      pageIndex: newParams.pageIndex,
      filters: transformedFilters,
      searchString: newParams.searchString || '',
    };

    setParams(prevParams => {
      const hasChanged = JSON.stringify(prevParams) !== JSON.stringify(transformedParams);
      return hasChanged ? transformedParams : prevParams;
    });
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
    fetchData,
    isFetching,
  };
};
