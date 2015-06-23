import React, { PropTypes } from 'react';

export default class EntryTlogMetabarComments {
  static propTypes = {
    url: PropTypes.string.isRequired,
    userLogged: PropTypes.object,
    commentsCount: PropTypes.number.isRequired
  }
  render() {
    let content;

    if (this.props.userLogged) {
      content = (
        <a className="meta-item__common meta__link">
          {i18n.t('entry_meta_comment_link')}
        </a>
      );
    } else {
      content = (
        <a href={this.props.url} className="meta-item__common meta__link">
          {this.getNumberOfComments()}
        </a>
      );
    }

    return (
      <span className="meta-item meta-item_comments">
        <span className="meta__content">{content}</span>
      </span>
    );
  }
  getNumberOfComments() {
    if (this.props.commentsCount) {
      return i18n.t('comments_count', {count: this.props.commentsCount});
    } else {
      return i18n.t('no_comments');
    }
  }
}