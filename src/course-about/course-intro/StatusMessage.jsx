import React from 'react';
import { Alert, Icon } from '@openedx/paragon';
import { Info, Check, WarningFilled } from '@openedx/paragon/icons';

export const STATUS_MESSAGE_VARIANTS = {
  INFO: 'info',
  SUCCESS: 'success',
  DANGER: 'danger',
};

const ICONS = {
  [STATUS_MESSAGE_VARIANTS.INFO]: Info,
  [STATUS_MESSAGE_VARIANTS.SUCCESS]: Check,
  [STATUS_MESSAGE_VARIANTS.DANGER]: WarningFilled,
};

export const StatusMessage = ({ variant, message }) => {
  const IconComponent = ICONS[variant];

  return (
    <Alert variant={variant} className='d-flex align-items-center mb-0 w-100'>
      <Icon src={IconComponent} className='mr-2 alert-icon' />
      <span className='font-weight-bold'>
        {message}
      </span>
    </Alert>
  );
};
