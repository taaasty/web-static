import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getAppStatsIfNeeded } from '../../actions/AppStatsActions';
import Auth from '../Auth';
import UserToolbarContainer from '../toolbars/UserToolbarContainer';
import ComposeToolbar from '../ComposeToolbar';
import BrowserSupportContainer from '../BrowserSupport/BrowserSupportContainer';

class AppPage extends Component {
  componentWillMount() {
    this.props.getAppStatsIfNeeded();
  }
  componentWillReceiveProps() {
    this.props.getAppStatsIfNeeded();
  }
  render() {
    const { children, currentUser, tlog } = this.props;
    const isLogged = !!currentUser.data.id;

    return (
      <div className="page">
        {children}
        {!isLogged && <Auth fixed />}
        {isLogged && <ComposeToolbar tlog={tlog.data} user={currentUser.data} />}
        <UserToolbarContainer {...window.STATE_FROM_SERVER.userToolbar} />
        <BrowserSupportContainer />
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
  getAppStatsIfNeeded: PropTypes.func.isRequired,
  tlog: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    currentUser: state.currentUser,
    tlog: state.tlog,
  }),
  { getAppStatsIfNeeded }
)(AppPage);
