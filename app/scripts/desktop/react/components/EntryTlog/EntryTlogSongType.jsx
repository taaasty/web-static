import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogCommentsContainer from './EntryTlogCommentsContainer';

class EntryTlogSongType extends Component {
  startComment() {
    this.refs.comments.getWrappedInstance().startComment();
  }
  renderTitle() {
    const {
      entry,
    } = this.props;
    const title = entry.get('title');
    const audioUrl = entry.get('audioUrl');

    if (title) {
      return (
        <h1 className="post__title">
          <a
            className="post__link"
            href={audioUrl}
            target="_blank"
          >
            {title}
          </a>
        </h1>
      );
    }
  }
  renderActions() {
    if (this.props.hasModeration) {
      return <EntryTlogActions {...this.props} />;
    }
  }
  render() {
    const isPrivate = this.props.entry.get('isPrivate', false);

    return (
      <span>
        <header className="post__header">
          {!!isPrivate && <PrivacyBadge />}
          {this.renderTitle()}
        </header>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={this.startComment.bind(this)} />
        </div>
        {this.renderActions()}
        <EntryTlogCommentsContainer {...this.props} ref="comments" />
      </span>
    );
  }
}

EntryTlogSongType.propTypes = {
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
};

export default EntryTlogSongType;
