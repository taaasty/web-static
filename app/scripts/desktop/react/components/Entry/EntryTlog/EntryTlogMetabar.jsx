import React, { PropTypes } from 'react';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import { metabarAuthor } from '../../../helpers/EntryMetabarHelpers';
import EntryTlogMetabarComments from './EntryTlogMetabarComments';
import EntryTlogMetabarDate from './EntryTlogMetabarDate';
import EntryTlogMetabarRepost from './EntryTlogMetabarRepost';
import EntryTlogMetabarTags from './EntryTlogMetabarTags';
import EntryTlogMetabarActions from './EntryTlogMetabarActions';
import { TLOG_ENTRY_TYPE_ANONYMOUS } from '../../../../../shared/constants/TlogEntry';

function EntryTlogMetabar(props) {
  function renderAuthor() {
    const { entry: { author, tlog }, host_tlog_id } = props;
    const authorMeta = metabarAuthor({ host_tlog_id, author, tlog });

    if (authorMeta) {
      return (
        <span className="meta-item meta-item--user">
          <span className="meta-item__content">
            <a href={tlog.url} className="meta-item__link">
              <span className="meta-item__ava">
                <Avatar userpic={tlog.userpic} size={20} />
              </span>
            </a>
            <span dangerouslySetInnerHTML={{ __html: authorMeta }} />
          </span>
        </span>
      );
    }
  }

  function renderTags() {
    return (
      <EntryTlogMetabarTags
        tags={props.entry.tags}
        userSlug={props.entry.tlog.slug}
      />
    );
  }

  const { commentator, entry, onComment } = props;

  return (
    <span className="meta-bar">
      {renderAuthor()}
      <EntryTlogMetabarComments
        commentator={commentator}
        commentsCount={entry.comments_count}
        onComment={onComment}
        url={entry.url}
      />
      <EntryTlogMetabarDate
        date={entry.created_at}
        id={entry.id}
        url={entry.url}
      />
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
  onComment: PropTypes.func,
};

export default EntryTlogMetabar;
