import React from 'react';
import { Stack, Card } from '@openedx/paragon';
import { ListView } from '@openedx/paragon/icons';
import { Link } from 'react-router-dom';

const SidebarDetailsItem = ({ icon: Icon, label, value }) => (
  <>
    <div className='d-flex p-3 align-items-center'>
      <div className='mr-3'>
        <Icon className='pgn__icon' style={{ fontSize: '1.5rem', color: 'var(--pgn-color-brand-base)' }} />
      </div>
      <div>
        <h3 className='h6 mb-0 text-muted'>{label}</h3>
        <div>{value}</div>
      </div>
    </div>
    <Card.Divider />
  </>
);

export const SidebarDetails = ({ courseAboutData }) => {
  const renderPrerequisites = () => {
    if (!courseAboutData.preRequisiteCourses?.length) {
      return null;
    }

    const prerequisite = courseAboutData.preRequisiteCourses[0];
    const prerequisiteUrl = '/learner-dashboard/courses/' + prerequisite.key + '/about';

    return (
      <>
        <SidebarDetailsItem
          key='prerequisites'
          icon={ListView}
          label='Prerequisites'
          value={<Link to={prerequisiteUrl}>{prerequisite.display}</Link>}
        />
        <Card.Divider />
      </>
    );
  };

  const renderAboutSidebarHtml = () => {
    if (!courseAboutData.aboutSidebarHtml) {
      return null;
    }

    return (
      <div className='p-3'>
        <div dangerouslySetInnerHTML={{ __html: courseAboutData.aboutSidebarHtml }} />
      </div>
    );
  };

  return (
    <Stack>
      {renderPrerequisites()}
      {renderAboutSidebarHtml()}
    </Stack>
  );
};

export const CourseSidebar = ({ courseAboutData }) => (
  <Card className="course-sidebar-wrapper">
    <Card.Section className='p-0'>
      <SidebarDetails courseAboutData={courseAboutData} />
    </Card.Section>
  </Card>
);
