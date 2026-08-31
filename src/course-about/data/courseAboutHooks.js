import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getConfig } from '@edx/frontend-platform';
import { fetchCourseAboutData, changeCourseEnrolment } from './courseAboutApi';

export const useCourseAboutData = (courseId) => useQuery({
  queryKey: ['courseAboutData', courseId],
  queryFn: () => fetchCourseAboutData(courseId),
});

export function useEnrollment({ onError, errorMessage }) {
  return useCallback(async (courseId, redirectUrl) => {
    try {
      await changeCourseEnrolment(courseId);
      window.location.href = redirectUrl;
    } catch (error) {
      if (error?.customAttributes?.httpErrorStatus === 403) {
        const nextPath = `/courses/${courseId}/about`;
        window.location.href = `${getConfig().LOGIN_URL}?next=${encodeURIComponent(nextPath)}`;
        return;
      }
      onError(errorMessage);
    }
  }, [onError, errorMessage]);
}
