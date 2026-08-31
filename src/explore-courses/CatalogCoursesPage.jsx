import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Alert } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import { DEFAULT_PAGE_SIZE } from './data/constants';
import { useCourseListSearch } from './hooks/useCourseListSearch';
import { useDebouncedSearchInput } from './hooks/useDebouncedSearchInput';
import { useCatalog } from './hooks/useCatalog';
import { transformAggregationsToFilterChoices, getPageTitle } from './utils';
import messages from './messages';

import { AlertNotification } from './components/AlertNotification';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SearchField } from './components/SearchField';
import { CoursesDataTable } from './components/CoursesDataTable';

const CatalogCoursesPage = () => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search_query') || '';
  const {
    data: courseData,
    isLoading,
    isError,
    fetchData,
    isFetching,
  } = useCourseListSearch({ searchString: searchQuery });

  const {
    pageIndex,
    filterState,
    searchString,
    hasInitializedFromUrl,
    urlSearchQuery,
    previousCourseData,
    handleSearch,
    handleFetchData,
    resetFilterProgress,
  } = useCatalog({
    fetchData, courseData, isFetching, searchParams, setSearchParams,
  });

  const { setSearchInput } = useDebouncedSearchInput({
    searchString,
    handleSearch,
  });

  const displayData = useMemo(() => {
    const hasSearchResults = (courseData?.results?.length ?? 0) > 0;
    const hasActiveSearch = Boolean(searchString);

    const shouldShowPreviousData = hasActiveSearch && !hasSearchResults && previousCourseData;

    return shouldShowPreviousData ? previousCourseData : courseData;
  }, [courseData, searchString, previousCourseData]);

  useEffect(() => {
    if (!isFetching && filterState.isFilterChangeInProgress) {
      resetFilterProgress();
    }
  }, [isFetching, filterState.isFilterChangeInProgress, resetFilterProgress]);

  const tableColumns = useMemo(
    () => transformAggregationsToFilterChoices(displayData?.aggs, intl),
    [displayData?.aggs, intl],
  );

  if (isLoading || (!hasInitializedFromUrl && urlSearchQuery)) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Container className="py-5.5">
        <Alert variant="danger">
          <ErrorPage
            message={intl.formatMessage(messages.errorMessage, {
              supportEmail: getConfig().INFO_EMAIL,
            })}
          />
        </Alert>
      </Container>
    );
  }

  const totalCourses = displayData?.results?.length ?? 0;
  const pageCount = Math.ceil((displayData?.total || totalCourses) / DEFAULT_PAGE_SIZE);
  const hasCourses = totalCourses > 0 || (previousCourseData?.total ?? 0) > 0;

  return (
    <>
      <Helmet>
        <title>
          {intl.formatMessage(messages.pageTitle, {
            siteName: getConfig().SITE_NAME || 'Open edX',
          })}
        </title>
      </Helmet>
      <Container fluid={false} size="xl" style={{ marginTop: '2rem' }}>
        <h2 className="mb-4">
          {getPageTitle({
            intl,
            searchString,
            courseDataResultsLength: courseData?.results?.length,
          })}
        </h2>
        {hasCourses ? (
          <>
            <SearchField
              setSearchInput={setSearchInput}
              handleSearch={handleSearch}
              initialSearchValue={searchString}
            />
            <CoursesDataTable
              displayData={displayData}
              totalCourses={totalCourses}
              pageCount={pageCount}
              pageIndex={pageIndex}
              tableColumns={tableColumns}
              handleFetchData={handleFetchData}
            />
          </>
        ) : (
          <AlertNotification
            title={intl.formatMessage(messages.noCoursesAvailable)}
            message={intl.formatMessage(messages.noCoursesAvailableMessage)}
          />
        )}
      </Container>
    </>
  );
};

export default CatalogCoursesPage;
