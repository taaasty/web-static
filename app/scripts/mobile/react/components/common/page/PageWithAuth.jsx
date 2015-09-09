import React from 'react';

import PageWithToolbars from './PageWithToolbars';
import AuthManager from '../../auth/authManager';
import AuthButtonManager from '../../buttons/auth/authManager';

export default class PageWithAuth {
  static propTypes = PageWithToolbars.propTypes;

  render() {
    const { children, currentUser, locale } = this.props;
    
    return (
      <PageWithToolbars
        currentUser={currentUser}
        locale={locale}
      >
        <AuthButtonManager />
        {children}
        <AuthManager />
      </PageWithToolbars>
    );
  }
}
