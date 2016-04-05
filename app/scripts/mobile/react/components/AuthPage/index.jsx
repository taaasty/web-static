import React, { Component, PropTypes } from 'react';

import Auth from '../auth/auth';

import Page from '../common/page/Page';
import PageLayout from '../common/page/PageLayout';
import PageBody from '../common/page/PageBody';

class AuthPage extends Component {
  render() {
    return (
      <Page locale={this.props.locale}>
        <PageLayout>
          <PageBody>
            <Auth fixed />
          </PageBody>
        </PageLayout>
      </Page>
    );
  }
}

AuthPage.propTypes = {
  locale: PropTypes.string,
};

export default AuthPage;
