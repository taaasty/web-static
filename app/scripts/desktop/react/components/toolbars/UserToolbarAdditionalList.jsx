/*global i18n */
import React, { PropTypes } from 'react';
import UserToolbarListItem from './UserToolbarListItem';
import Routes from '../../../../shared/routes/routes';

class UserToolbarAdditionalList {
  onClickLogout(ev) {
    function redirect() {
      window.location.href = Routes.logout_path(this.props.slug);
    }

    ev.preventDefault();
    ev.stopPropagation();

    if (window.ga) {
      window.ga('send', 'event', 'Account', 'Logout', { hitCallback: redirect.bind(this) });
    } else {
      redirect();
    }
  }
  render() {
    const { onSearchClick, onSettingsClick, searchTitleI18nKey, user: { slug } } = this.props;

    return (
      <ul className="toolbar__nav toolbar__nav--bottom">
        <UserToolbarListItem
          icon="icon--magnifier"
          onClick={onSearchClick}
          title={i18n.t(`searchbox_titles.${searchTitleI18nKey}`)}
        />
        <UserToolbarListItem
          icon="icon--cogwheel"
          onClick={onSettingsClick}
          title={i18n.t('toolbar_settings_item')}
          url={Routes.userSettings(slug)}
        />
        <UserToolbarListItem
          icon="icon--logout"
          onClick={this.onClickLogout.bind(this)}
          title={i18n.t('toolbar_logout_item')}
          url={Routes.logout_path(slug)}
        />
      </ul>
    );
  }
}

UserToolbarAdditionalList.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  searchTitleI18nKey: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserToolbarAdditionalList;
