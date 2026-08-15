import React from 'react';
import { Button } from '@openedx/paragon';

import useIsCollapsed from './hooks';

export const ActionButton = (props) => {
  return (
    <Button
      {...props}
      size="sm"
    />
  );
};

export default ActionButton;
