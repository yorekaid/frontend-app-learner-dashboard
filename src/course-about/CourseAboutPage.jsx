import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { Container, Layout, Alert, useMediaQuery, breakpoints, Stack, Spinner } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useCourseAboutData } from './data/courseAboutHooks';
import { CourseIntro } from './course-intro/CourseIntro';
import { CourseMedia } from './course-intro/CourseMedia';
import { CourseOverview } from './course-overview/CourseOverview';
import { CourseSidebar } from './course-sidebar/CourseSidebar';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const fullWidthSingleColumn = [{ span: 12 }, { span: 'auto' }];
const centeredSingleColumnWithMargins = [{ span: 10, offset: 1 }, { span: 'auto' }];
const twoColumns = [{ span: 9 }, { span: 3 }];
const GRID_LAYOUT = { xs: fullWidthSingleColumn, sm: centeredSingleColumnWithMargins, md: centeredSingleColumnWithMargins, lg: centeredSingleColumnWithMargins, xl: twoColumns };

const CourseAboutPage = () => {
  const { courseId = '' } = useParams();
  const isSmallScreen = useMediaQuery({ maxWidth: breakpoints.large.maxWidth });

  const { data: courseAboutData, isLoading, isError } = useCourseAboutData(courseId);

  useEffect(() => {
    getAuthenticatedHttpClient().get(getConfig().LMS_BASE_URL + '/api/course_home/outline/' + courseId)
      .then(res => console.log('OUTLINE DATA:', res.data))
      .catch(err => console.error('OUTLINE ERROR:', err));
  }, [courseId]);

  if (isLoading) { return <Container className='d-flex justify-content-center py-5'><Spinner animation='border' variant='primary' /></Container>; }
  if (isError) { return <Container className='py-5'><Alert variant='danger'>There was an error loading this course. Please contact support.</Alert></Container>; }

  return (
    <>
      <Helmet><title>{(courseAboutData?.name ?? '') + ' | ' + getConfig().SITE_NAME}</title></Helmet>
      <Container size='xl' className='mt-4 mb-5'>
        <Layout {...GRID_LAYOUT}>
          <Layout.Element>
            {isSmallScreen ? (
              <Stack gap={4}>
                <CourseMedia courseAboutData={courseAboutData} />
                <CourseIntro courseAboutData={courseAboutData} />
                <CourseOverview overviewData={courseAboutData.overview} courseId={courseId} />
                <CourseSidebar courseAboutData={courseAboutData} />
              </Stack>
            ) : (
              <Stack gap={4}>
                <CourseIntro courseAboutData={courseAboutData} />
                <CourseOverview overviewData={courseAboutData.overview} courseId={courseId} />
              </Stack>
            )}
          </Layout.Element>
          <Layout.Element>
            {!isSmallScreen && (
              <Stack gap={4}>
                <CourseMedia courseAboutData={courseAboutData} />
                <CourseSidebar courseAboutData={courseAboutData} />
              </Stack>
            )}
          </Layout.Element>
        </Layout>
      </Container>
    </>
  );
};
export default CourseAboutPage;
