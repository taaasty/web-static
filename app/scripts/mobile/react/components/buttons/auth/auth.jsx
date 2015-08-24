import React from 'react';
import ScreenController from '../../../controllers/screen';

let AuthButton = React.createClass({
  render() {
    return (
      <button className="auth-button"
              onClick={ this.handleClick }>
        { i18n.t('buttons.auth_signin') }
      </button>
    )
  },

  handleClick() {
    //FIXME: Route transitionTo Auth
    ScreenController.show(Auth, {}, 'auth-page')
  }
});

export default AuthButton;