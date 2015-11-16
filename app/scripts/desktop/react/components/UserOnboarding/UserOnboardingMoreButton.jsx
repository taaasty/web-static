/*global i18n */
import React, { PropTypes } from 'react';
import Spinner from '../../../../shared/react/components/common/Spinner';

class UserOnboardingMoreButton {
  showMore() {
    const { isLoading, showMore } = this.props;

    !isLoading && showMore();
  }
  render() {
    const { isLoading } = this.props;

    return (
      <button className="more-button" onClick={this.showMore.bind(this)}>
        {isLoading ? <Spinner size={24} /> : i18n.t('load_more_button')}
      </button>
    );
  }
}

UserOnboardingMoreButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showMore: PropTypes.func.isRequired,
};

export default UserOnboardingMoreButton;
