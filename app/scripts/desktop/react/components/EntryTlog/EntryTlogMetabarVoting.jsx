import React, { PropTypes } from 'react';
import Voting from '../Voting';

function EntryTlogMetabarVoting({ entry }) {
  return entry.isVoteable
    ? (
      <span className="meta-item meta-item--vote">
        <span className="meta__content">
          <span className="meta-item__common meta__link">
           <Voting ratingId={entry.rating} />
          </span>
        </span>
      </span>
    )
    : <noscript />;
}

EntryTlogMetabarVoting.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default EntryTlogMetabarVoting;
