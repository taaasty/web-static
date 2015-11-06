import React, { PropTypes } from 'react';
import EntryMetaVoting from './MetaVoting';
import EntryMetaActions from './MetaActions';
import EntryMetaComments from './MetaComments';
import EntryMetaDate from './MetaDate';

class EntryMeta {
  renderVoting() {
    const { id, is_voteable, rating } = this.props.entry;

    if (is_voteable) {
      return <EntryMetaVoting entryId={id} rating={rating} />;
    }
  }
  render() {
    const { commentsCount, entry, onDelete, onMetaCommentsClick } = this.props;

    return(
      <div className="post__meta">
        <EntryMetaActions
          entry={entry}
          onDelete={onDelete}
        />
        {this.renderVoting()}
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
}

EntryMeta.propTypes = {
  entry: PropTypes.object.isRequired,
  commentsCount: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onMetaCommentsClick: PropTypes.func.isRequired,
};

export default EntryMeta;
