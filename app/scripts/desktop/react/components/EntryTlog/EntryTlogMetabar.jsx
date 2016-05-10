import React, { PropTypes } from 'react';
import MetabarAuthor from '../common/MetabarAuthor';
import EntryTlogMetabarComments from './EntryTlogMetabarComments';
import EntryTlogMetabarDate from './EntryTlogMetabarDate';
import EntryTlogMetabarTags from './EntryTlogMetabarTags';
import EntryTlogMetabarActions from './EntryTlogMetabarActions';
import EntryTlogMetabarVoting from './EntryTlogMetabarVoting';
import EntryTlogMetabarShare from './EntryTlogMetabarShare';

function EntryTlogMetabar(props) {
  function renderTags() {
    return (
      <EntryTlogMetabarTags
        tags={props.entry.tags}
        userSlug={props.entry.tlog.slug}
      />
    );
  }

  const { commentator, entry, hostTlogId, onComment } = props;

  return (
    <span className="meta-bar">
      <EntryTlogMetabarVoting entry={entry} />
      <EntryTlogMetabarComments
        commentator={commentator}
        commentsCount={entry.commentsCount}
        onComment={onComment}
        url={entry.url}
      />
      <EntryTlogMetabarShare commentator={commentator} entry={entry} />
      <MetabarAuthor
        author={entry.author}
        hostTlogId={hostTlogId}
        size={24}
        tlog={entry.tlog}
      />
      <EntryTlogMetabarDate entry={entry} />
      {entry.tags && entry.tags.length && renderTags()}
      <EntryTlogMetabarActions {...props} />
    </span>
  );
}

EntryTlogMetabar.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hostTlogId: PropTypes.number,
  onComment: PropTypes.func,
};

export default EntryTlogMetabar;
