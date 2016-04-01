import React, { Component, PropTypes } from 'react';

import PageWithToolbars from '../common/page/PageWithToolbars';
import PageLayout from '../common/page/PageLayout';
import PageBody from  '../common/page/PageBody';

import CurrentUserStore from '../../stores/currentUser';
import ConversationStore from '../../stores/conversation';
import MessageStore from '../../stores/message'
import Messenger from '../messenger/messenger';

class MessengerThreadPage extends Component {
  componentWillMount() {
    const { conversation, currentUser, messagesInfo: { items } } = this.props;

    CurrentUserStore.initialize(currentUser);
    ConversationStore.initSingular(conversation);
    MessageStore.initialize(items);
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
            <Messenger state="conversation"/>
          </PageBody>
        </PageLayout>
      </PageWithToolbars>
    );
  }
}

MessengerThreadPage.propTypes = {
  conversation: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  locale: PropTypes.string,
  messagesInfo: PropTypes.shape({
    items: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default MessengerThreadPage;
