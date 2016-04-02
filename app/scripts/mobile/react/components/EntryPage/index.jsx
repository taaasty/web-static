import React, { Component, PropTypes } from 'react';

import HeroTlog from '../hero/tlog';
import EntryTlog from '../entry/Tlog';
import EntryPagination from '../pagination/entry';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

class EntryPage extends Component {
  render() {
    const { currentUser, entry, locale, tlog } = this.props;
    
    return (
      <PageWithAuth
        currentUser={currentUser}
        locale={locale}
      >
        <PageLayout>
          <PageHeader>
            <HeroTlog tlog={tlog} />
          </PageHeader>
          <PageBody>
            <EntryTlog
              commentFormVisible
              entry={entry}
            />
            <EntryPagination tlogUrl={tlog.tlog_url} />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}

EntryPage.propTypes = {
  currentUser: PropTypes.object,
  entry: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  tlog: PropTypes.object.isRequired,
};

export default EntryPage;
