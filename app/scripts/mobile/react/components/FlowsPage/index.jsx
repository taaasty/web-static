import React, { Component, PropTypes } from 'react';

import FlowsActions from '../../actions/view/FlowsActions';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

import HeroFeed from '../HeroFeed';
import FlowsListContainer from './FlowsListContainer';

import { SM_FLOWS_LIST, sendCategory } from '../../../../shared/react/services/Sociomantic';

const bgImageUrl = '/images/hero-cover.jpg';

class FlowsPage extends Component {
  componentWillMount() {
    const { flows, sort } = this.props;

    FlowsActions.init(flows, sort);
    sendCategory(SM_FLOWS_LIST);
  }
  render() {
    const { currentUser, flows, locale } = this.props;

    return (
      <PageWithAuth currentUser={currentUser} locale={locale}>
        <PageLayout>
          <PageHeader>
            <HeroFeed
              backgroundUrl={bgImageUrl}
              entriesCount={null}
              title={i18n.t('feed.flows')}
            />
          </PageHeader>
          <PageBody>
            <FlowsListContainer />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}

FlowsPage.propTypes = {
  currentUser: PropTypes.object,
  flows: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
};

export default FlowsPage;
