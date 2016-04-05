import React, { Component, PropTypes } from 'react';

import FeedStore from '../../stores/feed';
import HeroFeedBest from '../hero/feedBest';
import FeedBest from  '../feed/feedBest';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

class FeedBestPage extends Component {
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
  locale: PropTypes.string.isRequired,
};

export default FeedBestPage;
