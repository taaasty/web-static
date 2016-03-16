import React, { PropTypes } from 'react';
import PeopleItem from './PeopleItem';
import Spinner from '../../../../shared/react/components/common/Spinner';

function PeopleList({ isFetching, people, query }) {
  return (
   <section className="people">
     {isFetching
      ? <Spinner size={30} />
      : people.length === 0
        ? query ? i18n.t('people.query_empty', { query }) : i18n.t('people.empty')
        : people.map(({ title, user }, idx) => (
            <PeopleItem
              key={`user-${idx}`}
              title={title}
              user={user}
            />))}
   </section>
  );
}

PeopleList.displayName = 'PeopleList';

PeopleList.propTypes = {
  isFetching: PropTypes.bool,
  people: PropTypes.array.isRequired,
  query: PropTypes.string,
};

export default PeopleList;
