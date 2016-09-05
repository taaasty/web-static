/*global i18n */
import React from 'react';
import ApiRoutes from '../../../../shared/routes/api';

function SignInVk() {
  function handleClick() {
    window.location = ApiRoutes.omniauth_url('vkontakte');
  }

  return (
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text popup__text--soc">
          <span>
            {i18n.t('vkontakte_suggestions_not_signedin')}
          </span>
          <button className="vk-auth-button" onClick={handleClick}>
            {i18n.t('vkontakte_suggestions_signin_button')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInVk;
