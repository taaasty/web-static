/*global i18n */
import React, { PropTypes } from 'react';
import UserToolbarListItem from './UserToolbarListItem';
import Routes from '../../../../shared/routes/routes';

function UserToolbarAdditionalList({ onSearchClick, onSettingsClick, searchKey, slug }) {
  function onClickLogout(ev) {
    function redirect() {
      window.location.href = Routes.logout_path();
    }

    ev.preventDefault();
    ev.stopPropagation();

    if (window.ga) {
      window.ga('send', 'event', 'Account', 'Logout', { hitCallback: redirect });
    } else {
      redirect();
    }
  }

  return (
    <ul className="toolbar__nav toolbar__nav--bottom">
      <UserToolbarListItem
        icon="icon--magnifier"
        onClick={onSearchClick}
        title={i18n.t(`searchbox_titles.${searchKey}`)}
      />
      <UserToolbarListItem
        icon="icon--cogwheel"
        onClick={onSettingsClick}
        title={i18n.t('toolbar_settings_item')}
        url={Routes.userSettings(slug)}
      />
      <UserToolbarListItem
        icon="icon--logout"
        onClick={onClickLogout}
        title={i18n.t('toolbar_logout_item')}
        url={Routes.logout_path()}
      />
    </ul>
  );
}

UserToolbarAdditionalList.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default UserToolbarAdditionalList;
