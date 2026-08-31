import React from 'react';
import {
  breakpoints, DataTable, useMediaQuery, TextFilter, Row, Col
} from '@openedx/paragon';
import { useIntl } from 'react-intl';
import messages from '../messages';
import { DEFAULT_PAGE_SIZE } from '../data/constants';
import { CourseCard } from './CourseCard';

export const CoursesDataTable = ({
  displayData,
  totalCourses,
  pageCount,
  pageIndex,
  tableColumns,
  handleFetchData,
}) => {
  const intl = useIntl();
  const isMedium = useMediaQuery({ maxWidth: breakpoints.large.maxWidth });

  return (
    <DataTable
      numBreakoutFilters={0}
      isFilterable={false}
      isSortable={true}
      isPaginated
      manualFilters
      manualPagination
      defaultColumnValues={{ Filter: TextFilter }}
      itemCount={displayData?.total || totalCourses}
      pageSize={DEFAULT_PAGE_SIZE}
      pageCount={pageCount}
      initialState={{ pageSize: DEFAULT_PAGE_SIZE, pageIndex }}
      data={displayData?.results || []}
      columns={tableColumns}
      fetchData={handleFetchData}
      initialTableOptions={{ getRowId: (row) => row.id }}
    >
      <DataTable.TableControlBar />
      
      <div className="custom-course-grid py-3">
        <Row>
          {(displayData?.results || []).map((item) => {
            const data = item.data || {};
            return (
              <Col
                key={item.id}
                xs={12}
                sm={6}
                md={4}
                xl={3}
                className="mb-4"
              >
                <div className="h-100 w-100">
                  <CourseCard
                    courseId={data.id}
                    courseOrg={data.org}
                    courseName={data.content?.displayName || data.course}
                    courseNumber={data.number}
                    courseImageUrl={data.imageUrl}
                    courseStartDate={data.start}
                    courseAdvertisedStart={data.advertisedStart}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      <DataTable.EmptyTable content={intl.formatMessage(messages.noResultsFound)} />
      <DataTable.TableFooter />
    </DataTable>
  );
};
