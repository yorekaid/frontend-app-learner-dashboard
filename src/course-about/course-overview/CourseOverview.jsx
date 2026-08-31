import React, { useEffect, useState } from 'react';
import { Container, Card, Stack, Spinner } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const processOverviewContent = (content, lmsBaseUrl) => {
  if (!content) return '';
  
  // Parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  
  // We only want the 'about' section. If it doesn't exist, we fallback to all
  const aboutSection = doc.querySelector('.about');
  let finalHtml = aboutSection ? aboutSection.outerHTML : content;

  // Replace relative URLs with absolute ones
  return finalHtml.replace(/(href|src)="(\/.*?)"/g, `$1="${lmsBaseUrl}$2"`);
};

export const CourseOverview = ({ overviewData, courseId }) => {
  const [syllabus, setSyllabus] = useState(null);
  const [loadingSyllabus, setLoadingSyllabus] = useState(true);

  useEffect(() => {
    setLoadingSyllabus(true);
    getAuthenticatedHttpClient().get(`${getConfig().LMS_BASE_URL}/api/course_home/outline/${courseId}`)
      .then(res => {
        setSyllabus(res.data?.course_blocks);
        setLoadingSyllabus(false);
      })
      .catch(err => {
        console.error('Error fetching syllabus:', err);
        setLoadingSyllabus(false);
      });
  }, [courseId]);

  const processedOverviewData = processOverviewContent(overviewData, getConfig().LMS_BASE_URL);
  const hasOverviewContent = processedOverviewData.trim().length > 0;

  const renderSyllabus = () => {
    if (loadingSyllabus) {
      return (
        <div className="mt-4 d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

    if (!syllabus || !syllabus.blocks) {
      return (
        <div className="mt-5 text-muted">
          <em>Detailed syllabus is only available to enrolled learners or through authenticated access.</em>
        </div>
      );
    }

    // Process blocks into a list of chapters and sequences
    const courseBlock = syllabus.blocks[syllabus.root];
    if (!courseBlock || !courseBlock.children) return null;

    return (
      <div className="mt-5">
        <h3>Course Syllabus</h3>
        <Stack gap={3} className="mt-3">
          {courseBlock.children.map(chapterId => {
            const chapter = syllabus.blocks[chapterId];
            if (!chapter) return null;
            
            return (
              <Card key={chapterId} className="shadow-sm">
                <Card.Header title={chapter.display_name} />
                <Card.Section>
                  <ul className="mb-0 pl-4">
                    {chapter.children?.map(seqId => {
                      const sequence = syllabus.blocks[seqId];
                      if (!sequence) return null;
                      return <li key={seqId} className="py-1">{sequence.display_name}</li>;
                    })}
                  </ul>
                </Card.Section>
              </Card>
            );
          })}
        </Stack>
      </div>
    );
  };

  return (
    <Container className="px-0 course-about-overview">
      <Card>
        <Card.Section>
          {hasOverviewContent && (
            <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: processedOverviewData }} />
          )}
          {renderSyllabus()}
        </Card.Section>
      </Card>
    </Container>
  );
};
