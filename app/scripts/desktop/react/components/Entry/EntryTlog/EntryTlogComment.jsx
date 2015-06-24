import React, { PropTypes } from 'react';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import EntryTlogCommentMetabar from './EntryTlogCommentMetabar';

export default class EntryTlogComment {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    entryUrl: PropTypes.string.isRequired
  }
  render() {
    return (
      <article className="comment">
        <div className="comment__table">
          <div className="comment__table-cell">
            <a href={this.props.comment.user.tlog_url}
               title={this.props.comment.user.name}
               target="_blank"
               className="comment__user">
              <span className="comment__avatar">
                <Avatar userpic={this.props.comment.user.userpic} size={35} />
              </span>
              <span className="comment__username comment__username--bold">
                {this.props.comment.user.name} {}
              </span>
            </a>
            <span dangerouslySetInnerHTML={{__html: this.props.comment.comment_html}} />
            <EntryTlogCommentMetabar {...this.props} />
          </div>
        </div>
      </article>
    );
  }
}