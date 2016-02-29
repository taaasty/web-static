import React, { PropTypes } from 'react';
import MetabarAuthor from '../common/MetabarAuthor';
import EntryTlogMetabarComments from './EntryTlogMetabarComments';
import EntryTlogMetabarDate from './EntryTlogMetabarDate';
import EntryTlogMetabarRepost from './EntryTlogMetabarRepost';
import EntryTlogMetabarTags from './EntryTlogMetabarTags';
import EntryTlogMetabarActions from './EntryTlogMetabarActions';
import { TLOG_ENTRY_TYPE_ANONYMOUS } from '../../../../shared/constants/TlogEntry';

function EntryTlogMetabar(props) {
  function renderTags() {
    return (
      <EntryTlogMetabarTags
        tags={props.entry.tags}
        userSlug={props.entry.tlog.slug}
      />
    );
  }

  const { commentator, entry, host_tlog_id, isFeed, onComment } = props;

  return (
    <span className="meta-bar">
      <MetabarAuthor
        author={entry.author}
        hostTlogId={host_tlog_id}
        tlog={entry.tlog}
      />
      <EntryTlogMetabarComments
        commentator={commentator}
        commentsCount={entry.comments_count}
        onComment={onComment}
        url={entry.url}
      />
      <EntryTlogMetabarDate entry={entry} isFeed={isFeed} />
      {(entry.type !== TLOG_ENTRY_TYPE_ANONYMOUS) &&
       <EntryTlogMetabarRepost
        commentator={commentator}
        entryID={entry.id}
       />}
      {entry.tags && entry.tags.length && renderTags()}
      <EntryTlogMetabarActions {...props} />
    </span>
  );
}

EntryTlogMetabar.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  host_tlog_id: PropTypes.number,
  isFeed: PropTypes.bool,
  onComment: PropTypes.func,
};

export default EntryTlogMetabar;
