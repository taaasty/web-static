import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import MetabarAuthor from '../common/MetabarAuthor';
import Voting from '../common/Voting';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickMetabar({ entry, hostTlogId, onVote }) {
  function renderMetaVote() {
    const { id, rating } = entry;

    return (
      <span className="meta-item meta-item--vote">
        <span className="meta-item__content">
          <Voting entry={entry} onVote={onVote} />
        </span>
      </span>
    );
  }

  function renderMetaComments() {
    const { commentsCount, url } = entry;

    return (
      <span className="meta-item meta-item--comments">
        <span className="meta-item__content">
          <Link
            className="meta-item__link"
            to={{ pathname: uri(url).path(), hash: '#comments', state: { id: entry.id } }}
          >
            <i className="icon icon--comments" />
            {commentsCount}
          </Link>
        </span>
      </span>
    );
  }

  return (
    <span className="meta-bar">
      {entry.isVoteable && renderMetaVote()}
      {!!entry.commentsCount && renderMetaComments()}
      <MetabarAuthor
        author={entry.author}
        hostTlogId={hostTlogId}
        tlog={entry.tlog}
      />
    </span>
  );
}

EntryBrickMetabar.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  hostTlogId: PropTypes.number,
  onVote: PropTypes.func.isRequired,
};

export default EntryBrickMetabar;
