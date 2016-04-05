import React, { Component, PropTypes } from 'react';

import NotificationStore from '../../stores/notification';
import Notifications from  '../notifications/notifications';

import PageWithToolbars from '../common/page/PageWithToolbars';
import PageLayout from '../common/page/PageLayout';
import PageBody from  '../common/page/PageBody';

class NotificationsPage extends Component {
  componentWillMount() {
    NotificationStore.initialize(this.props.notifications);
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
            <Notifications />
          </PageBody>
        </PageLayout>
      </PageWithToolbars>
    );
  }
}

NotificationsPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  locale: PropTypes.string,
  notifications: PropTypes.array.isRequired,
};

export default NotificationsPage;
