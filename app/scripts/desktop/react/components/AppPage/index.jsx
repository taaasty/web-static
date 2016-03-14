/*global i18n, ReactApp */
import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getAppStatsIfNeeded } from '../../actions/AppStatsActions';
import Auth from '../Auth';
import UserToolbar from '../UserToolbar';
import ComposeToolbar from '../ComposeToolbar';
import BrowserSupport from '../BrowserSupport';

class AppPage extends Component {
  componentWillMount() {
    this.props.getAppStatsIfNeeded();
  }
  componentWillReceiveProps() {
    this.props.getAppStatsIfNeeded();
  }
  render() {
    const { children, currentUser, editing, location, params, tlog } = this.props;
    const isLogged = !!currentUser.data.id;

    return (
      <div className="page">
        {children}
        {!isLogged && params.entrySlug && <Auth fixed />}
        {!isLogged &&
         <button
           className="auth-button"
           onClick={() => ReactApp.shellbox.show(Auth)}
         >
           {i18n.t('auth_button')}
         </button>
        }
        {!editing && isLogged && <ComposeToolbar tlog={tlog.data} user={currentUser.data} />}
        {!editing && <UserToolbar location={location} />}
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
