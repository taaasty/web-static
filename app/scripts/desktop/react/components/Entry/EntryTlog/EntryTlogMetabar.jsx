import React, { PropTypes } from 'react';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import EntryTlogMetabarComments from './EntryTlogMetabarComments';
import EntryTlogMetabarDate from './EntryTlogMetabarDate';
import EntryTlogMetabarRepost from './EntryTlogMetabarRepost';
import EntryTlogMetabarTags from './EntryTlogMetabarTags';
import EntryTlogMetabarActions from './EntryTlogMetabarActions';

export default class EntryTlogMetabar {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    commentator: PropTypes.object,
  }
  render() {
    return (
      <span className="meta-bar">
        {this.renderAuthor()}
        <EntryTlogMetabarComments
            url={this.props.entry.url}
            commentator={this.props.commentator}
            commentsCount={this.props.entry.comments_count}
            onComment={this.props.onComment} />
        <EntryTlogMetabarDate
            url={this.props.entry.url}
            date={this.props.entry.created_at} />
        <EntryTlogMetabarRepost
          entryID={this.props.entry.id}
          commentator={this.props.commentator}
        />
        {this.renderTags()}
        <EntryTlogMetabarActions {...this.props} />
      </span>
    );
  }
  renderAuthor() {
    const { entry: { tlog }, host_tlog_id } = this.props;
    let authorMeta = '';

    if (tlog != null) {
      if (host_tlog_id === null) {
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
