/*global i18n */
import React, { PropTypes } from 'react';
import PeopleItem from './PeopleItem';
import Spinner from '../../../../shared/react/components/common/Spinner';

function PeopleList({ isFetching, people, query }) {
  function renderContents() {
    if (isFetching) {
      return (
        <div className="people__msg-container">
          <Spinner size={30} />
        </div>
      );
    } else if (people.count() === 0) {
      return (
        <div className="people__msg-container">
          {query ? i18n.t('people.query_empty', { query }) : i18n.t('people.empty')}
        </div>
      ); 
    } else {
      return people.map((user, idx) => <PeopleItem key={`user-${idx}`} user={user} />).valueSeq();
    }
  }

  return (
   <section className="people">
     {renderContents()}
   </section>
  );
}

PeopleList.displayName = 'PeopleList';

PeopleList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  people: PropTypes.object.isRequired,
  query: PropTypes.string,
};

export default PeopleList;
