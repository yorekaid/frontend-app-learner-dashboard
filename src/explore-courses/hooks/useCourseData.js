import { useState, useEffect } from 'react';

/**
 * Custom hook for managing course data caching.
 */
export const useCourseData = ({
  courseData,
  searchString,
}) => {
  const [previousCourseData, setPreviousCourseData] = useState(null);

  /**
   * Handles course data state changes.
   */
  useEffect(() => {
    if (courseData && !searchString && courseData.total > 0) {
      setPreviousCourseData(courseData);
    }
  }, [courseData, searchString]);

  return { previousCourseData };
};
