import React, { Component, PropTypes } from 'react';

import FeedStore from '../../stores/feed';
import HeroFeedFriends from '../hero/feedFriends';
import FeedFriends from '../feed/feedFriends';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

class FeedFriendsPage extends Component {
  componentWillMount() {
    FeedStore.initialize(this.props.entries);
  }
  render() {
    const { currentUser, entries, feed: { backgroundUrl, entriesCount }, locale } = this.props;
    
    return (
      <PageWithAuth
        currentUser={currentUser}
        locale={locale}
      >
        <PageLayout>
          <PageHeader>
            <HeroFeedFriends
              backgroundUrl={backgroundUrl}
              entriesCount={entriesCount}
            />
          </PageHeader>
          <PageBody>
            <FeedFriends entries={entries} />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}

FeedFriendsPage.propTypes = {
  currentUser: PropTypes.object,
  entries: PropTypes.array.isRequired,
  feed: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export default FeedFriendsPage;
