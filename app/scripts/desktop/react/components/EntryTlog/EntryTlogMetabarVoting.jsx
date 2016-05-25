/*global i18n */
import React, { PropTypes } from 'react';
import Voting from '../common/Voting';

function EntryTlogMetabarVoting({ entry }) {
  return entry.is_voteable
    ? (
      <span className="meta-item meta-item--vote">
        <span className="meta__content">
          <span className="meta-item__common meta__link">
           <Voting entryID={entry.id} rating={entry.rating} />
          </span>
        </span>
      </span>
    )
    : <noscript />;
}

EntryTlogMetabarVoting.propTypes = {
  commentator: PropTypes.object,
  commentsCount: PropTypes.number.isRequired,
  onComment: PropTypes.func,
  url: PropTypes.string.isRequired,
};

export default EntryTlogMetabarVoting;
