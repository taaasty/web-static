/*global i18n */
import React, { PropTypes } from 'react';
import PopupActions from '../actions/PopupActions';
import { connect } from 'react-redux';

function UserSlug({ isCurrentPremium, user, showAsStar }) {
  function handlePremiumClick(ev) {
    if (!isCurrentPremium()) {
      ev.stopPropagation();
      ev.preventDefault();
      PopupActions.showGetPremiumPopup();
    }
  }

  const slug = user.get('slug');

  return user.get('isPremium')
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
  isCurrentPremium: PropTypes.bool.isRequired,
  showAsStar: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

UserSlug.defaultProps = {
  isCurrentPremium: false,
  showAsStar: false,
  user: {},
};

export default connect(
  (state, props) => Object.assign({}, props, { isCurrentPremium: state.currentUser.data.isPremium })
)(UserSlug);