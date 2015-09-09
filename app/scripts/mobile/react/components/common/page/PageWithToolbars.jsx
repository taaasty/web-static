import React, { PropTypes } from 'react';

import CurrentUserStore from '../../../stores/currentUser';

import Page from './Page';
import FeedToolbarManager from '../../toolbars/feedManager';
import UserToolbarManager from '../../toolbars/userManager';

export default class PageWithToolbars {
  static propTypes = {
    ...Page.propTypes,
    currentUser: PropTypes.object,
  }
  componentWillMount() {
    // Temporarily initialize CurrentUserStore here. Later on it will be set at
    // root App component
    // Some signin gists https://gist.github.com/ButuzGOL/707d1605f63eef55e4af
    CurrentUserStore.initialize(this.props.currentUser);
  }
  render() {
    const { locale, children } = this.props;
    
    return (
      <Page locale={locale}>
        <FeedToolbarManager />
        <UserToolbarManager />
        {children}
      </Page>
    );
  }
}
