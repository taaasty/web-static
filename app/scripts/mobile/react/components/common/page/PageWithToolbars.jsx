import React, { Component, PropTypes } from 'react';

import CurrentUserStore from '../../../stores/currentUser';

import Page from './Page';
import FeedToolbarManager from '../../toolbars/feedManager';
import UserToolbarManager from '../../toolbars/userManager';
import SupportLauncher from '../../SupportLauncher';

export default class PageWithToolbars extends Component {
  static propTypes = {
    ...Page.propTypes,
    currentUser: PropTypes.object,
  };
  componentWillMount() {
    // Temporarily initialize CurrentUserStore here. Later on it will be set at
    // root App component
    // Some signin gists https://gist.github.com/ButuzGOL/707d1605f63eef55e4af
    CurrentUserStore.initialize(this.props.currentUser);
  }
  render() {
    const { locale, children, currentUser } = this.props;

    return (
      <Page locale={locale}>
        <FeedToolbarManager />
        <UserToolbarManager />
        {false && <SupportLauncher user={currentUser} />}
        {children}
      </Page>
    );
  }
}
