import React from 'react';

import PageWithToolbars from './PageWithToolbars';
import AuthManager from '../../auth/authManager';
import AuthButtonManager from '../../buttons/auth/authManager';

export default class PageWithAuth {
  static propTypes = PageWithToolbars.propTypes;

  render() {
    const { locale, children } = this.props;
    
    return (
      <PageWithToolbars locale={locale}>
        <AuthButtonManager />
        {children}
        <AuthManager />
      </PageWithToolbars>
    );
  }
}
