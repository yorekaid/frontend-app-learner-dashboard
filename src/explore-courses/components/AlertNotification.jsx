import React from 'react';
import { Alert as BaseAlert } from '@openedx/paragon';
import { Info as InfoIcon } from '@openedx/paragon/icons';

export const AlertNotification = ({
  variant = 'info', title, message, className = '',
}) => (
  <BaseAlert variant={variant} icon={InfoIcon} className={className}>
    <BaseAlert.Heading>{title}</BaseAlert.Heading>
    <p>{message}</p>
  </BaseAlert>
);
