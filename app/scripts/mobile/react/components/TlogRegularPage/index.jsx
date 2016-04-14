import React, { Component, PropTypes } from 'react';

import * as ProjectTypes from '../../../../shared/react/ProjectTypes';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

import HeroTlog from '../hero/tlog';
import Tlog from '../Tlog/Tlog';
import TlogPagination from '../pagination/TlogPagination';

import { sendCategory } from '../../../../shared/react/services/Sociomantic';

export default class TlogRegularPage extends Component {
  componentWillMount() {
    sendCategory(this.props.pagination.type);
  }
  render () {
    const { currentUser, entries, locale, pagination, tlog } = this.props;
    
    return (
      <PageWithAuth currentUser={currentUser} locale={locale}>
        <PageLayout>
          <PageHeader>
            <HeroTlog tlog={tlog} />
          </PageHeader>
          <PageBody>
            <Tlog entries={entries} tlog={tlog} />
            <TlogPagination
              pagination={pagination}
              slug={tlog.author.slug}
            />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}

TlogRegularPage.propTypes = {
  currentUser: PropTypes.object, //elaborate
  entries: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  pagination: ProjectTypes.pagination,
  tlog: ProjectTypes.tlog.isRequired,
};

TlogRegularPage.defaultProps = {
  entries: [],
};

export default TlogRegularPage;
