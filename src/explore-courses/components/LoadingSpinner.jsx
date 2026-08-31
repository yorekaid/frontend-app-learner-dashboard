import React from 'react';
import { Spinner } from '@openedx/paragon';

export const LoadingSpinner = () => (
  <div className="d-flex justify-content-center py-5">
    <Spinner animation="border" />
  </div>
);
