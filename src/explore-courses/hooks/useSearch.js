import { useState, useCallback, useEffect } from 'react';

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from '../data/constants';

/**
 * Custom hook for managing search functionality in the catalog.
 */
export const useSearch = ({
  fetchData, isFetching, searchParams, setSearchParams,
}) => {
  const [searchString, setSearchString] = useState('');

  const [hasInitializedFromUrl, setHasInitializedFromUrl] = useState(false);

  const urlSearchQuery = searchParams.get('search_query') || '';

  /**
   * Handles search operations to ensure proper state management and API calls.
   */
  const handleSearch = useCallback((query) => {
    setSearchString(query);

    const newParams = new URLSearchParams(searchParams.toString());
    if (query) {
      newParams.set('search_query', query);
    } else {
      newParams.delete('search_query');
    }
    setSearchParams(newParams, { replace: true });

    fetchData({
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      filters: [],
      searchString: query,
    });
  }, [fetchData, searchParams, setSearchParams]);

  /**
   * Initializes search state from URL parameters on component mount.
   */
  useEffect(() => {
    if (hasInitializedFromUrl) {
      return;
    }

    if (urlSearchQuery && !searchString) {
      setSearchString(urlSearchQuery);
      if (!isFetching) {
        fetchData({
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
          filters: [],
          searchString: urlSearchQuery,
        });
      }
    }
    setHasInitializedFromUrl(true);
  }, [urlSearchQuery, hasInitializedFromUrl, isFetching, fetchData, searchString]);

  return {
    hasInitializedFromUrl,
    urlSearchQuery,
    searchString,
    handleSearch,
  };
};
