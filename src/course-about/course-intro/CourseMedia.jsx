import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import noCourseImg from '../../assets/empty-course.svg'; // Reuse empty course image if we don't have noCourseImg

export const CourseMedia = ({ courseAboutData }) => {
  const imageUrl = courseAboutData?.media?.courseImage?.uri || courseAboutData?.media?.image?.raw;
  const imgSrc = imageUrl ? `${getConfig().LMS_BASE_URL}${imageUrl}` : noCourseImg;

  return (
    <div className="course-media-wrapper mb-4">
      <img
        src={imgSrc}
        alt={courseAboutData.name}
        className="img-fluid rounded"
        style={{ width: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};
