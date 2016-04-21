import React, { Component, PropTypes } from 'react';

import PageWithToolbars from '../common/page/PageWithToolbars';
import PageLayout from '../common/page/PageLayout';
import PageBody from  '../common/page/PageBody';

import ConversationStore from '../../stores/conversation';
import Messenger from '../messenger/messenger';

class MessengerPage extends Component {
  componentWillMount() {
    ConversationStore.initPlural(this.props.conversationsInfo.items);
  }
  render() {
    const { currentUser, locale } = this.props;

    return (
      <PageWithToolbars
        currentUser={currentUser}
        locale={locale}
        noSupport
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
т
