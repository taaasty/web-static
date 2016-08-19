/*global i18n */
import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';

function SettingsAccounts({ user: { name, userpic } }) {
  function onClickLogout(ev) {
    const { href } = ev.target;

    ev.preventDefault();

    if (window.ga) {
      window.ga('send', 'event', 'Account', 'Logout', {
        hitCallback: () => window.location.href = href,
      });
    } else {
      window.location.href = href;
    }
  }

  return (
    <div className="settings__item">
      <div className="accounts">
        <div className="account state--active">
          <div className="account__actions">
            <a
              className="button button--outline"
              href={Routes.logout_path()}
              onClick={onClickLogout}
            >
              <span className="button__text">
                {i18n.t('settings_accounts_logout_button')}
              </span>
            </a>
          </div>
          <div className="account__info">
            <div className="account__avatar">
              <Avatar
                name={name}
                size={45}
                userpic={userpic}
              />
            </div>
            <div className="account__desc">
              <div className="account__name">{name}</div>
              <div className="account__status">
                {i18n.t('settings_accounts_account_status')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SettingsAccounts.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SettingsAccounts;
