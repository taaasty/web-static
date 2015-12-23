import React, { Component, PropTypes } from 'react';

import FeedStore from '../../stores/feed';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

import HeroFeedLive from './HeroFeedLive';
import FeedLive from '../feed/feedLive';

class FeedLivePage extends Component {
  componentWillMount() {
    FeedStore.initialize(this.props.entries);
  }
  render() {
    const { currentUser, feed: { backgroundUrl, entriesCount }, feedType, locale } = this.props;
    
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
              feedType={feedType}
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
  feedType: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default FeedLivePage;
