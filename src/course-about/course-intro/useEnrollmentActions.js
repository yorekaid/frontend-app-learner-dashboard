import { useState, useMemo, useCallback } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { changeCourseEnrolment } from '../data/courseAboutApi';

export const useEnrollmentActions = ({ courseId, ecommerceCheckoutLink }) => {
  const [enrollmentError, setEnrollmentError] = useState(null);
  const [isEnrollmentPending, setIsEnrollmentPending] = useState(false);

  const handleChangeEnrollment = useCallback(async () => {
    setIsEnrollmentPending(true);
    try {
      await changeCourseEnrolment(courseId);
      window.location.href = getConfig().LMS_BASE_URL + '/dashboard';
    } catch (error) {
      setIsEnrollmentPending(false);
      if (error?.customAttributes?.httpErrorStatus === 403) {
        const nextPath = '/courses/' + courseId + '/about';
        window.location.href = getConfig().LOGIN_URL + '?next=' + encodeURIComponent(nextPath);
        return;
      }
      setEnrollmentError('There was an error enrolling in this course. Please try again.');
    }
  }, [courseId]);

  const handleEcommerceCheckout = useCallback(() => {
    if (!ecommerceCheckoutLink) { return; }
    window.location.assign(ecommerceCheckoutLink);
  }, [ecommerceCheckoutLink]);

  return {
    enrollmentError,
    isEnrollmentPending,
    handleChangeEnrollment,
    handleEcommerceCheckout,
  };
};
