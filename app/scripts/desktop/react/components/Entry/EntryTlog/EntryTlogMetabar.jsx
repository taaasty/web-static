import React, { PropTypes } from 'react';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import EntryTlogMetabarComments from './EntryTlogMetabarComments';
import EntryTlogMetabarDate from './EntryTlogMetabarDate';
import EntryTlogMetabarRepost from './EntryTlogMetabarRepost';
import EntryTlogMetabarTags from './EntryTlogMetabarTags';
import EntryTlogMetabarActions from './EntryTlogMetabarActions';
import { TLOG_ENTRY_TYPE_ANONYMOUS } from '../../../../../shared/constants/TlogEntry';

export default class EntryTlogMetabar {
  static propTypes = {
    commentator: PropTypes.object,
    entry: PropTypes.object.isRequired,
    host_tlog_id: PropTypes.number,
    onComment: PropTypes.func,
  }
  render() {
    const { commentator, entry, onComment } = this.props;

    return (
      <span className="meta-bar">
        {this.renderAuthor()}
        <EntryTlogMetabarComments
          commentator={commentator}
          commentsCount={entry.comments_count}
          onComment={onComment}
          url={entry.url}
        />
        <EntryTlogMetabarDate
          date={entry.created_at}
          url={entry.url}
        />
        {(entry.type !== TLOG_ENTRY_TYPE_ANONYMOUS) &&
         <EntryTlogMetabarRepost
          commentator={commentator}
          entryID={entry.id}
         />}
        {this.renderTags()}
        <EntryTlogMetabarActions {...this.props} />
      </span>
    );
  }
  renderAuthor() {
    const { entry: { tlog }, host_tlog_id } = this.props;
    let authorMeta = '';

    if (tlog != null) {
      if (host_tlog_id == null) {
        authorMeta = tlog.tag;
      } else if (host_tlog_id !== tlog.id) {
        authorMeta = i18n.t('entry.meta.repost_from', { tag: tlog.tag });
      } else {
        return null;
      }

      return (
        <span className="meta-item meta-item--user">
          <span className="meta-item__content">
            <a href={tlog.url} className="meta-item__link">
              <span className="meta-item__ava">
                <Avatar userpic={tlog.userpic} size={20} />
              </span>
              <span>{authorMeta}</span>
            </a>
          </span>
        </span>
      );
    }
  }
  renderTags() {
    if (this.props.entry.tags && this.props.entry.tags.length) {
      return (
        <EntryTlogMetabarTags
            tags={this.props.entry.tags}
            userSlug={this.props.entry.tlog.slug} />
      );
    }
  }
}
