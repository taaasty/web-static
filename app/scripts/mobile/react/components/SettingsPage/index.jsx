import React, { PropTypes } from 'react';

import PageWithToolbars from '../common/page/PageWithToolbars';
import PageLayout from '../common/page/PageLayout';
import PageBody from  '../common/page/PageBody';
import Settings from  './settings';

export default class SettingsPage {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
  }
  render() {
    const { currentUser, locale } = this.props;

    return (
      <PageWithToolbars
        currentUser={currentUser}
        locale={locale}
      >
        <PageLayout>
          <PageBody>
            <Settings />
          </PageBody>
        </PageLayout>
      </PageWithToolbars>
    );
  }
}
