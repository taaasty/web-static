import React, { Component, PropTypes } from 'react';

import PageWithToolbars from '../common/page/PageWithToolbars';
import PageLayout from '../common/page/PageLayout';
import PageBody from  '../common/page/PageBody';

import CurrentUserStore from '../../stores/currentUser';
import ConversationStore from '../../stores/conversation';
import Messenger from '../messenger/messenger';

class MessengerPage extends Component {
  componentWillMount() {
    const { currentUser, conversationsInfo: { items } } = this.props;

    CurrentUserStore.initialize(currentUser);
    ConversationStore.initPlural(items);
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
            <Messenger />
          </PageBody>
        </PageLayout>
      </PageWithToolbars>
    );
  }
}

MessengerPage.propTypes = {
  conversationsInfo: PropTypes.shape({
    items: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
  currentUser: PropTypes.object.isRequired,
  locale: PropTypes.string,
};

export default MessengerPage;
