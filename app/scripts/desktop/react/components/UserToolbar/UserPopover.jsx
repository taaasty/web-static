/*global i18n */
import React, { Component, PropTypes } from 'react';
import Popover from './Popover';
import { Link } from 'react-router';
import Routes from '../../../../shared/routes/routes';
import uri from 'urijs';

class UserPopover extends Component {
  render() {
    const { currentUser, hideUserPopover, onDesignSettingsClick, onFriendsClick, onSettingsClick } = this.props;
    const { slug, tlog_url } = currentUser;

    return (
      <Popover hide={hideUserPopover}>
        <div className="popup popup--user popup--light front-layer">
          <div className="popup__arrow popup__arrow--up" />
          <div className="popup__content">
            <div className="popup__body">
              <ul className="popup-user__list" onClick={hideUserPopover}>
                <li className="popup-user__list-item">
                  <Link
                    className="popup-user__link"
                    to={uri(tlog_url).path()}
                  >
                    {i18n.t('toolbar.user.my_tlog')}
                  </Link>
                </li>
                <li className="popup-user__list-item">
                  <Link
                    className="popup-user__link"
                    to={uri(Routes.favorites_url(slug)).path()}
                  >
                    {i18n.t('toolbar.user.favorites')}
                  </Link>
                </li>
                <li className="popup-user__list-item">
                  <Link
                    className="popup-user__link"
                    to={uri(Routes.private_entries_url(slug)).path()}
                  >
                    {i18n.t('toolbar.user.private')}
                  </Link>
                </li>
                <li className="popup-user__list-item">
                  <a
                    className="popup-user__link"
                    href={tlog_url}
                    onClick={onFriendsClick}
                  >
                    {i18n.t('toolbar.user.subscriptions')}
                  </a>
                </li>
                <li className="popup-user__list-item">
                  <Link
                    className="popup-user__link"
                    onClick={onDesignSettingsClick}
                    to={uri(Routes.userDesignSettings(slug)).path()}
                  >
                    {i18n.t('toolbar.user.design_settings')}
                  </Link>
                </li>
                <li className="popup-user__list-item">
                  <a
                    className="popup-user__link"
                    href={Routes.userSettings(slug)}
                    onClick={onSettingsClick}
                  >
                    {i18n.t('toolbar.user.settings')}
                  </a>
                </li>
                <li className="popup-user__list-item">
                  <a
                    className="popup-user__link"
                    href={Routes.logout_path()}
                  >
                    {i18n.t('toolbar.user.logout')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Popover>
    );
  }
}

UserPopover.propTypes = {
  currentUser: PropTypes.object.isRequired,
  hideUserPopover: PropTypes.func.isRequired,
  onDesignSettingsClick: PropTypes.func.isRequired,
  onFriendsClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
};

export default UserPopover;
