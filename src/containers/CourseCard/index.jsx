import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardBanners from './components/CourseCardBanners';
import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';

import './CourseCard.scss';

export const CourseCard = ({
  cardId,
}) => {
  const orientation = 'vertical';
  return (
    <div className="course-card" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100 h-100">
          <div className="d-flex flex-column flex-grow-1 position-relative">
            <CourseCardImage cardId={cardId} orientation="vertical" />
            <div className="course-card-menu-wrapper" style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, background: 'white', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <CourseCardMenu cardId={cardId} />
            </div>
            <Card.Body className="d-flex flex-column flex-grow-1">
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
              />
              <Card.Section className="pt-0 flex-grow-1">
                <CourseCardDetails cardId={cardId} />
              </Card.Section>
              <Card.Footer orientation={orientation}>
                <CourseCardActions cardId={cardId} />
              </Card.Footer>
              <div className='p-1'>
                <CourseCardBanners cardId={cardId} />
              </div>
            </Card.Body>
          </div>

        </div>
      </Card>
    </div>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
