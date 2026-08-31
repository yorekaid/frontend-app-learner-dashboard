import { defineMessages } from 'react-intl';

export default defineMessages({
  pageTitle: {
    id: 'courseAbout.pageTitle',
    defaultMessage: '{courseName} | {siteName}',
    description: 'The title of the page.',
  },
  errorMessage: {
    id: 'courseAbout.errorMessage',
    defaultMessage: 'There was an error loading this course. Please contact support at {supportEmail}',
    description: 'Error message when the course fails to load.',
  },
  enrollNowBtn: {
    id: 'courseAbout.enrollNowBtn',
    defaultMessage: 'Enroll Now',
    description: 'Button text to enroll in the course.',
  },
  enrollNowBtnPending: {
    id: 'courseAbout.enrollNowBtnPending',
    defaultMessage: 'Enrolling...',
    description: 'Button text while enrollment is pending.',
  },
  statusMessageEnrollmentError: {
    id: 'courseAbout.statusMessageEnrollmentError',
    defaultMessage: 'There was an error enrolling in this course. Please try again.',
    description: 'Error message when enrollment fails.',
  },
  statusMessageEnrolled: {
    id: 'courseAbout.statusMessageEnrolled',
    defaultMessage: 'You are enrolled in this course.',
    description: 'Success message when user is enrolled.',
  },
  statusMessageFull: {
    id: 'courseAbout.statusMessageFull',
    defaultMessage: 'This course is full.',
    description: 'Message when the course is full.',
  },
  statusMessageEnrollmentInvitationOnly: {
    id: 'courseAbout.statusMessageEnrollmentInvitationOnly',
    defaultMessage: 'This course is by invitation only.',
    description: 'Message when the course is invitation only.',
  },
  statusMessageEnrollmentClosed: {
    id: 'courseAbout.statusMessageEnrollmentClosed',
    defaultMessage: 'Enrollment for this course is closed.',
    description: 'Message when enrollment is closed.',
  },
  viewCourseBtn: {
    id: 'courseAbout.viewCourseBtn',
    defaultMessage: 'View Course',
    description: 'Button text to view the course content.',
  },
  prerequisites: {
    id: 'courseAbout.prerequisites',
    defaultMessage: 'Prerequisites',
    description: 'Label for course prerequisites.',
  },
  prerequisitesCompletion: {
    id: 'courseAbout.prerequisitesCompletion',
    defaultMessage: 'You must complete {prerequisite} before taking this course.',
    description: 'Message explaining prerequisite requirements.',
  },
});
