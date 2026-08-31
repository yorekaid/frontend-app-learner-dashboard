import React from 'react';
import classNames from 'classnames';
import { breakpoints, SearchField as ParagonSearchField, useMediaQuery } from '@openedx/paragon';
import { useIntl } from 'react-intl';
import messages from '../messages';

export const SearchField = ({
  setSearchInput,
  handleSearch,
  initialSearchValue,
}) => {
  const intl = useIntl();
  const isMedium = useMediaQuery({ maxWidth: breakpoints.large.maxWidth });

  return (
    <ParagonSearchField
      key="search-field"
      className={classNames({
        'w-auto mx-2.5 mb-0': isMedium,
        'mb-4 w-25': !isMedium,
      })}
      placeholder={intl.formatMessage(messages.searchPlaceholder)}
      onChange={(value) => {
        setSearchInput(value);
      }}
      onSubmit={(value) => {
        setSearchInput(value);
        handleSearch(value);
      }}
      value={initialSearchValue}
    />
  );
};
