import React from 'react';
import { Button } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { StatusMessage, STATUS_MESSAGE_VARIANTS } from './StatusMessage';
import { EnrolledStatus } from './EnrolledStatus';
import { EnrollmentButton } from './EnrollmentButton';

export const useEnrollmentStatus = ({
  courseAboutData,
  enrollmentError,
  authenticatedUser,
  isEnrollmentPending,
  handleChangeEnrollment,
  handleEcommerceCheckout,
}) => {
  const {
    id: courseId,
    canEnroll,
    enrollment,
    isShibCourse,
    isCourseFull,
    allowAnonymous,
    singlePaidMode,
    invitationOnly,
    ecommerceCheckout,
    showCoursewareLink,
  } = courseAboutData;

  const renderStatusContent = () => {
    if (enrollmentError) {
      return <StatusMessage variant={STATUS_MESSAGE_VARIANTS.DANGER} message='There was an error enrolling in this course. Please try again.' />;
    }

    if (authenticatedUser && enrollment?.isActive) {
      return <EnrolledStatus showCoursewareLink={showCoursewareLink} courseId={courseId} />;
    }

    if (isCourseFull) {
      return <StatusMessage variant={STATUS_MESSAGE_VARIANTS.INFO} message='This course is full.' />;
    }

    if (invitationOnly && !canEnroll) {
      return <StatusMessage variant={STATUS_MESSAGE_VARIANTS.INFO} message='This course is by invitation only.' />;
    }

    if (!isShibCourse && !canEnroll) {
      return <StatusMessage variant={STATUS_MESSAGE_VARIANTS.INFO} message='Enrollment for this course is closed.' />;
    }

    if (allowAnonymous && showCoursewareLink) {
      const coursewareUrl = getConfig().LMS_BASE_URL + '/courses/' + courseId + '/course/';
      return (
        <Button as='a' href={coursewareUrl}>
          View Course
        </Button>
      );
    }

    return (
      <EnrollmentButton
        singlePaidMode={singlePaidMode}
        ecommerceCheckout={ecommerceCheckout}
        isEnrollmentPending={isEnrollmentPending}
        onEnroll={handleChangeEnrollment}
        onEcommerceCheckout={handleEcommerceCheckout}
      />
    );
  };

  return { renderStatusContent };
};
