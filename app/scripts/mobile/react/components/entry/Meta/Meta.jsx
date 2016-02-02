import React, { PropTypes } from 'react';
import EntryMetaVoting from './MetaVoting';
import EntryMetaActions from './MetaActions';
import EntryMetaComments from './MetaComments';
import EntryMetaDate from './MetaDate';

function EntryMeta(props) {
  function renderVoting() {
    const { id, is_voteable, rating } = props.entry;

    if (is_voteable) {
      return <EntryMetaVoting entryId={id} rating={rating} />;
    }
  }
  
  const { commentsCount, entry, onDelete, onMetaCommentsClick } = props;

  return(
    <div className="post__meta">
      <EntryMetaActions
        entry={entry}
        onDelete={onDelete}
      />
      {renderVoting()}
      {entry.is_private && <div className="meta-private" />}
      <EntryMetaComments
        commentsCount={commentsCount}
        onClick={onMetaCommentsClick}
      />
      <EntryMetaDate
        date={entry.created_at}
        entryUrl={entry.entry_url}
      />
    </div>
  );
}

EntryMeta.propTypes = {
  entry: PropTypes.object.isRequired,
  commentsCount: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onMetaCommentsClick: PropTypes.func.isRequired,
};

export default EntryMeta;
