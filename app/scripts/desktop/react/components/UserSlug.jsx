import React, { PropTypes } from 'react';
import PopupActions from '../actions/PopupActions';
import CurrentUserStore from '../stores/current_user';

function UserSlug({ user: { is_premium, slug } }) {
  function handlePremiumClick(ev) {
    if (!CurrentUserStore.isPremium()) {
      ev.stopPropagation();
      ev.preventDefault();
      PopupActions.showGetPremiumPopup();
    }
  }

  return is_premium
    ? (
      <span>
        {slug + ' '}
        <span className="premium-badge" onClick={handlePremiumClick}/>
      </span>
    )
    : <span>{slug}</span>;
}

UserSlug.displayName = 'UserSlug';

UserSlug.propTypes = {
  user: PropTypes.object.isRequired,
};

UserSlug.defaultProps = {
  user: {},
};

export default UserSlug;
