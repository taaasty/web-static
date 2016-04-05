import React, { Component, PropTypes } from 'react';

import * as ProjectTypes from '../../../../shared/react/ProjectTypes';

import PageWithAuth from '../common/page/PageWithAuth';
import PageLayout from '../common/page/PageLayout';
import PageHeader from '../common/page/PageHeader';
import PageBody from '../common/page/PageBody';

import HeroTlog from '../hero/tlog';
import Daylog from '../Daylog/Daylog';
import DaylogPagination from '../pagination/daylog';

class TlogDaylogPage extends Component {
  render () {
    const { currentUser, entries, locale,
            pagination: { nextDay, prevDay }, tlog } = this.props;
    
    return (
      <PageWithAuth currentUser={currentUser} locale={locale}>
        <PageLayout>
          <PageHeader>
            <HeroTlog tlog={tlog} />
          </PageHeader>
          <PageBody>
          <Daylog entries={entries} tlog={tlog} />
          <DaylogPagination
            nextDay={nextDay}
            prevDay={prevDay}
            slug={tlog.author.slug}
          />
          </PageBody>
        </PageLayout>
      </PageWithAuth>
    );
  }
}

TlogDaylogPage.propTypes = {
  currentUser: PropTypes.object, //elaborate
  entries: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  pagination: PropTypes.object.isRequired,
  tlog: ProjectTypes.tlog.isRequired,
};

TlogDaylogPage.defaultProps = {
  entries: [],
};

export default TlogDaylogPage;
