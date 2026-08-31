import React from 'react';
import { StatefulButton } from '@openedx/paragon';

export const EnrollmentButton = ({
  onEnroll,
  singlePaidMode = {},
  ecommerceCheckout,
  isEnrollmentPending,
  onEcommerceCheckout,
}) => (
  <StatefulButton
    variant={Object.keys(singlePaidMode).length > 0 ? 'outline-primary' : 'primary'}
    onClick={ecommerceCheckout ? onEcommerceCheckout : onEnroll}
    state={isEnrollmentPending ? 'pending' : 'default'}
    labels={{
      default: 'Enroll Now',
      pending: 'Enrolling...',
    }}
  />
);
