import React from 'react';
import { breakpoints, Button, Stack, useMediaQuery } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { STATUS_MESSAGE_VARIANTS, StatusMessage } from './StatusMessage';

export const EnrolledStatus = ({ showCoursewareLink, courseId }) => {
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

  const coursewareUrl = getConfig().LMS_BASE_URL + '/courses/' + courseId + '/course/';

  return (
    <Stack direction={isExtraSmall ? 'vertical' : 'horizontal'} gap={isExtraSmall ? 2 : 5}>
      <StatusMessage
        variant={STATUS_MESSAGE_VARIANTS.SUCCESS}
        message='You are enrolled in this course.'
      />
      {showCoursewareLink && (
        <Button as='a' href={coursewareUrl}>
          View Course
        </Button>
      )}
    </Stack>
  );
};
