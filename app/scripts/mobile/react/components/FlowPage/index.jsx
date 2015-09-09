import React, { Component, PropTypes } from 'react';

import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import FeedStore from '../../stores/feed';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

import HeroFlow from './HeroFlow';
import FeedFlow from './FeedFlow';

export default class FlowPage extends Component {
  static propTypes = {
    currentUser: PropTypes.object, //elaborate
    entries: PropTypes.array.isRequired,
    flow: ProjectTypes.flow.isRequired,
    locale: PropTypes.string.isRequired,
    relationship: ProjectTypes.relationship,
  }
  static defaultProps = {
    entries: [],
  }
  componentWillMount() {
    FeedStore.initialize(this.props.entries);
  }
  render () {
    const { currentUser, entries, flow, locale, relationship } = this.props;
    
    return (
      <PageWithAuth
        currentUser={currentUser}
        locale={locale}
      >
        <PageLayout>
          <PageHeader>
            <HeroFlow
              flow={flow}
              relationship={relationship}
            />
          </PageHeader>
          <PageBody>
            <FeedFlow
              entries={entries}
              flow={flow}
            />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}
