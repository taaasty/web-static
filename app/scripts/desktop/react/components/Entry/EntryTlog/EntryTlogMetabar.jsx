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
    isAuthorVisible: PropTypes.bool,
  }
  defaultProps = {
    isAuthorVisible: true
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
    if (this.props.entry.tlog != null && this.props.isAuthorVisible) {
      return (
        <span className="meta-item meta-item--user">
          <span className="meta-item__content">
            <a href={this.props.entry.tlog.url} className="meta-item__link">
              <span className="meta-item__ava">
                <Avatar userpic={this.props.entry.tlog.userpic} size={20} />
              </span>
              <span>{this.props.entry.tlog.tag}</span>
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