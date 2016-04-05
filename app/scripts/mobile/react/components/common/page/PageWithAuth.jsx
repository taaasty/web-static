import React from 'react';

import PageWithToolbars from './PageWithToolbars';
import AuthManager from '../../auth/authManager';
import AuthButtonManager from '../../buttons/auth/authManager';

function PageWithAuth({ children, currentUser, locale }) {
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

PageWithAuth.propTypet = PageWithToolbars.propTypes;

export default PageWithAuth;
