import {
  useEffect, useMemo, useState, useDeferredValue, useRef,
} from 'react';

// We need a simple debounce function since lodash.debounce might not be installed, 
// or we can use the lodash one if it is available. The platform usually has lodash.
import debounce from 'lodash/debounce';

/**
 * Custom hook for managing debounced search input with deferred value optimization.
 */
export const useDebouncedSearchInput = ({
  searchString,
  handleSearch,
  debounceDelay = 300,
}) => {
  const [searchInput, setSearchInput] = useState(searchString ?? '');
  const deferredSearchInput = useDeferredValue(searchInput);
  const lastQueryRef = useRef('');

  useEffect(() => {
    setSearchInput(searchString ?? '');
  }, [searchString]);

  const debouncedHandleSearch = useMemo(
    () => debounce((value) => {
      handleSearch(value);
    }, debounceDelay),
    [handleSearch, debounceDelay],
  );

  useEffect(() => () => debouncedHandleSearch.cancel(), [debouncedHandleSearch]);

  useEffect(() => {
    if (deferredSearchInput === lastQueryRef.current) {
      return;
    }

    lastQueryRef.current = deferredSearchInput;
    debouncedHandleSearch(deferredSearchInput);
  }, [deferredSearchInput, debouncedHandleSearch]);

  return { setSearchInput };
};
