/*global i18n, ReactApp */
import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getAppStatsIfNeeded } from '../../actions/AppStatsActions';
import Auth from '../Auth';
import UserToolbar from '../UserToolbar';
import ComposeToolbar from '../ComposeToolbar';
import BrowserSupport from '../BrowserSupport';
import SupportLauncher from '../SupportLauncher';
import PopupActions from '../../actions/PopupActions';

const PREMIUM_HASH_PARAM = 'premium';

class AppPage extends Component {
  componentWillMount() {
    this.props.getAppStatsIfNeeded();
  }
  componentDidMount() {
    if (new RegExp(`\\b${PREMIUM_HASH_PARAM}\\b`).test(String(this.props.location.hash))) {
      PopupActions.showGetPremiumPopup();
    }
  }
  componentWillReceiveProps() {
    this.props.getAppStatsIfNeeded();
  }
  render() {
    const { children, currentUser, editing, location, params, tlog } = this.props;
    const isLogged = !!currentUser.data.id;

    return (
      <div className="page">
        {!editing && <UserToolbar location={location} />}
        {children}
        {(!isLogged && params.entrySlug) &&
         <div className="inviter--fixed__wrapper">
           <div className="inviter--fixed">
             <Auth />
           </div>
         </div>
        }
        {!isLogged &&
         <button
           className="auth-button"
           onClick={() => ReactApp.shellbox.show(Auth)}
         >
           {i18n.t('auth_button')}
         </button>
        }
        {!editing && isLogged && <ComposeToolbar tlog={tlog.data} user={currentUser.data} />}
        {!editing && <SupportLauncher user={currentUser.data} />} 
        <BrowserSupport />
      </div>
    );
  }
}

AppPage.displayName = 'AppPage';

AppPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  currentUser: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  getAppStatsIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    currentUser: state.currentUser,
    editing: state.appState.data.editing,
    tlog: state.tlog,
  }),
  { getAppStatsIfNeeded }
)(AppPage);
