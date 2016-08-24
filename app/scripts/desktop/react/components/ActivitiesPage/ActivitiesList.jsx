import React, { PropTypes } from 'react';
import Scroller from '../common/Scroller';

function ActivitiesList(props) {
  const {
    entries,
    loadMoreEntries,
  } = props;

  return (
    <Scroller

    >
      {entries.map((item) => {
        return (
          <div>
            {item}
          </div>
        );
      })}
    </Scroller>
  );
}

ActivitiesList.propTypes = {
  entries: PropTypes.object.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
};

export default ActivitiesList;
