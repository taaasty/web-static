import React, { Component, PropTypes } from 'react';

import FeedStore from '../../stores/feed';
import HeroFeedBest from './HeroFeedBest';
import FeedBest from  '../feed/feedBest';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

import { sendCategory } from '../../../../shared/react/services/Sociomantic';

class FeedBestPage extends Component {
  componentWillMount() {
    const { entries, feedType } = this.props;

    FeedStore.initialize(entries);
    sendCategory(feedType);
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
            <HeroFeedBest
              backgroundUrl={backgroundUrl}
              entriesCount={entriesCount}
            />
          </PageHeader>
          <PageBody>
            <FeedBest entries={entries} />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}

FeedBestPage.propTypes = {
  currentUser: PropTypes.object,
  entries: PropTypes.array.isRequired,
  feed: PropTypes.object.isRequired,
  feedType: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default FeedBestPage;
