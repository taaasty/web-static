/*global i18n, ReactApp */
import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import Auth from '../Auth';
import UserToolbar from '../UserToolbar';
import ComposeToolbar from '../ComposeToolbar';
import BrowserSupport from '../BrowserSupport';

class AppPageEmpty extends Component {
  render() {
    const { currentUser, location } = this.props;
    const isLogged = !!currentUser.data.id;

    return (
      <div>
        {!isLogged &&
         <button
           className="auth-button"
           onClick={() => ReactApp.shellbox.show(Auth)}
         >
           {i18n.t('auth_button')}
         </button>
        }
         {isLogged && <ComposeToolbar user={currentUser.data} />}
         <UserToolbar location={location} />
         <BrowserSupport />
      </div>
    );
  }
}

AppPageEmpty.displayName = 'AppPageEmpty';

AppPageEmpty.propTypes = {
  currentUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    currentUser: state.currentUser,
  })
)(AppPageEmpty);
