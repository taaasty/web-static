import React, { PropTypes } from 'react';
import PeopleItem from './PeopleItem';
import Spinner from '../../../../shared/react/components/common/Spinner';

function PeopleList({ isFetching, people }) {
  return (
   <section className="people">
     {isFetching
      ? <Spinner size={30} />
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
};

export default PeopleList;
