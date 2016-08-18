import React, { PropTypes } from 'react';
import MetabarAuthor from '../common/MetabarAuthor';
import Voting from '../Voting';
import { Link } from 'react-router';
import uri from 'urijs';
import { pure } from 'recompose';

function EntryBrickMetabar(props) {
  const {
    entry,
    entryAuthor,
    entryTlog,
    hostTlogId,
  } = props;
  const id = entry.get('id');
  const url = entry.get('url', entry.get('entryUrl'));
  const commentsCount = entry.get('commentsCount');

  function renderMetaVote() {
    return (
      <span className="meta-item meta-item--vote">
        <span className="meta-item__content">
          <Voting ratingId={entry.get('rating')} />
        </span>
      </span>
    );
  }

  function renderMetaComments() {
    return (
      <span className="meta-item meta-item--comments">
        <span className="meta-item__content">
          <Link
            className="meta-item__link"
            to={{ pathname: uri(url).path(), hash: '#comments', state: { id } }}
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
      {!!entry.get('isVoteable') && renderMetaVote()}
      {!!commentsCount && renderMetaComments()}
      <MetabarAuthor
        author={entryAuthor}
        hostTlogId={hostTlogId}
        tlog={entryTlog}
      />
    </span>
  );
}

EntryBrickMetabar.propTypes = {
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  hostTlogId: PropTypes.number,
};

export default pure(EntryBrickMetabar);
