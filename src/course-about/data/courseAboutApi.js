import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const camelCaseObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelCaseObject(v));
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
      result[camelKey] = camelCaseObject(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

export const fetchCourseAboutData = async (courseId) => {
  const url = `${getConfig().LMS_BASE_URL}/api/courseware/course/${courseId}`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return camelCaseObject(data);
};

export const changeCourseEnrolment = async (courseId) => {
  const url = `${getConfig().LMS_BASE_URL}/change_enrollment`;
  const { data } = await getAuthenticatedHttpClient().post(
    url,
    {
      course_id: courseId,
      enrollment_action: 'enroll',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    },
  );
  return camelCaseObject(data);
};
