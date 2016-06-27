import React, { PropTypes } from 'react';
import PopupActions from '../actions/PopupActions';
import CurrentUserStore from '../stores/current_user';

function UserSlug({ user: { is_premium, slug }, showAsStar }) {
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
        {showAsStar
         ? <i
             className="premium-icon icon--star-fill"
             onClick={handlePremiumClick}
             title={i18n.t('user_slug.title')}
           />
         : <span className="premium-badge" onClick={handlePremiumClick}/>
        }
      </span>
    )
    : <span>{slug}</span>;
}

UserSlug.displayName = 'UserSlug';

UserSlug.propTypes = {
  showAsStar: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

UserSlug.defaultProps = {
  showAsStar: false,
  user: {},
};

export default UserSlug;
