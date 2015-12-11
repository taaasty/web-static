import React, { Component, PropTypes } from 'react';

import FeedStore from '../../stores/feed';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

import HeroFeedLive from '../hero/feedLive';
import FeedLive from '../feed/feedLive';

class FeedLivePage extends Component {
  componentWillMount() {
    FeedStore.initialize(this.props.entries);
  }
  render() {
    const { currentUser, feed: { backgroundUrl, entriesCount }, locale } = this.props;
    
    return (
      <PageWithAuth
        currentUser={currentUser}
        locale={locale}
      >
        <PageLayout>
          <PageHeader>
            <HeroFeedLive
              backgroundUrl={backgroundUrl}
              currentUser={currentUser}
              entriesCount={entriesCount}
            />
          </PageHeader>
          <PageBody>
            <FeedLive />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}

FeedLivePage.propTypes = {
  currentUser: PropTypes.object,
  entries: PropTypes.array.isRequired,
  feed: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export default FeedLivePage;
