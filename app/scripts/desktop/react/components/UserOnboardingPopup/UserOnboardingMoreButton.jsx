/*global i18n */
import React, { PropTypes } from 'react';
import Spinner from '../../../../shared/react/components/common/Spinner';

function UserOnboardingMoreButton({ isFetching, showMore }) {
  return (
    <div className="popup__more">
      <button className="more-button" onClick={showMore}>
        {isFetching ? <Spinner size={24} /> : i18n.t('load_more_button')}
      </button>
    </div>
  );
}

UserOnboardingMoreButton.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  showMore: PropTypes.func.isRequired,
};

export default UserOnboardingMoreButton;
