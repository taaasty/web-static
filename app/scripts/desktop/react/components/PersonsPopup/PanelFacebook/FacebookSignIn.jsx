/*global i18n */
import React from 'react';
import ApiRoutes from '../../../../../shared/routes/api';

function FacebookSignIn() {
  function handleClick() {
    window.location = ApiRoutes.omniauth_url('facebook');
  }

  return (
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="popup__text popup__text--soc">
          <span>
            {i18n.t('facebook_suggestions_not_signedin')}
          </span>
          <button className="fb-auth-button" onClick={handleClick}>
            {i18n.t('facebook_suggestions_signin_button')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FacebookSignIn;
