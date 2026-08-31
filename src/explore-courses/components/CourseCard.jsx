import React from 'react';
import {
  Card, useMediaQuery, breakpoints, Badge,
} from '@openedx/paragon';
import { useIntl } from 'react-intl';
import { getConfig } from '@edx/frontend-platform';
import { defineMessages } from 'react-intl';
import { Link } from 'react-router-dom';

const messages = defineMessages({
  startDate: {
    id: 'generic.course-card.start-date',
    defaultMessage: 'Starts: {startDate}',
    description: 'Start date.',
  },
});

const getFullImageUrl = (path) => {
  if (!path) {
    return '';
  }
  return `${getConfig().LMS_BASE_URL}${path}`;
};

const formatDate = (dateString, intl) => {
  const date = new Date(dateString);
  return intl.formatDate(date, { month: 'short', day: 'numeric', year: 'numeric' });
};

const getStartDateDisplay = (
  courseData,
  intl,
) => {
  if (courseData?.advertisedStart) {
    return courseData.advertisedStart;
  }

  if (courseData?.start) {
    return formatDate(courseData.start, intl);
  }

  return '';
};

export const CourseCard = ({
  isLoading,
  courseId,
  courseOrg,
  courseName,
  courseNumber,
  courseImageUrl,
  courseStartDate,
  courseAdvertisedStart,
}) => {
  const intl = useIntl();
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

  const startDateDisplay = (courseStartDate || courseAdvertisedStart) ? getStartDateDisplay({
    start: courseStartDate,
    advertisedStart: courseAdvertisedStart,
  }, intl) : null;

  const courseAboutUrl = courseId
    ? `/courses/${courseId}/about`
    : undefined;

  return (
    <Card
      as={courseAboutUrl ? Link : 'div'}
      to={courseAboutUrl}
      className={`course-card d-flex flex-column h-100 ${isExtraSmall ? 'w-100' : 'course-card-desktop'}`}
      isClickable={!isLoading}
      isLoading={isLoading}
      data-testid="course-card"
    >
      <Card.ImageCap
        src={getFullImageUrl(courseImageUrl)}
        srcAlt={`${courseName} ${courseNumber}`}
        skeletonDuringImageLoad
      />
      <Card.Header
        title={courseName}
        subtitle={(
          <>
            <div>{courseNumber}</div>
            <Badge variant="light">{courseOrg}</Badge>
          </>
        )}
        size="sm"
      />
      <Card.Section />
      <Card.Footer textElement={startDateDisplay && intl.formatMessage(messages.startDate, {
        startDate: startDateDisplay,
      })}
      />
    </Card>
  );
};
