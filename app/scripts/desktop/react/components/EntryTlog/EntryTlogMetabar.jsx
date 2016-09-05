import React, { PropTypes } from 'react';
import MetabarAuthor from '../common/MetabarAuthor';
import EntryTlogMetabarComments from './EntryTlogMetabarComments';
import EntryTlogMetabarDate from './EntryTlogMetabarDate';
import EntryTlogMetabarTags from './EntryTlogMetabarTags';
import EntryTlogMetabarActions from './EntryTlogMetabarActions';
import EntryTlogMetabarVoting from './EntryTlogMetabarVoting';
import EntryTlogMetabarShare from './EntryTlogMetabarShare';

function EntryTlogMetabar(props) {
  const {
    commentator,
    entry,
    entryAuthor,
    entryTlog,
    hostTlogId,
    onComment,
  } = props;

  return (
    <span className="meta-bar">
      <EntryTlogMetabarVoting entry={entry} />
      <EntryTlogMetabarComments
        commentsCount={entry.get('commentsCount')}
        onComment={onComment}
      />
      <EntryTlogMetabarShare
        commentator={commentator}
        entry={entry}
      />
      <MetabarAuthor
        author={entryAuthor}
        hostTlogId={hostTlogId}
        size={24}
        tlog={entryTlog}
      />
      <EntryTlogMetabarDate entry={entry} />
      <EntryTlogMetabarTags
        tags={entry.get('tags')}
        userSlug={entryTlog.get('slug')}
      />
      <EntryTlogMetabarActions {...props} />
    </span>
  );
}

EntryTlogMetabar.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  hostTlogId: PropTypes.number,
  onComment: PropTypes.func,
};

export default EntryTlogMetabar;
