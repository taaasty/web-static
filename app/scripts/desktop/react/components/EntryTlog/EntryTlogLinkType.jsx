import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogCommentsContainer from './EntryTlogCommentsContainer';

class EntryTlogLinkType extends Component {
  startComment() {
    this.refs.comments.startComment();
  }
  renderVoting() {
    const { entry, onVote } = this.props;

    return !!entry.rating.isVoteable && <Voting entry={entry} onVote={onVote} />;
  }
  renderTitle() {
    if (this.props.entry.title) {
      return (
        <h1 className="post__title">
          <a
            className="post__link"
            href={this.props.entry.link}
            target="_blank"
          >
            {this.props.entry.title}
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
    const { isPrivate, text } = this.props.entry;

    return (
      <span>
        <header className="post__header">
          {this.renderVoting()}
          {isPrivate && <PrivacyBadge />}
          {this.renderTitle()}
        </header>
        <div className="post__content">
          <Text value={text} withHTML />
        </div>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={this.startComment.bind(this)} />
        </div>
        {this.renderActions()}
        <EntryTlogCommentsContainer {...this.props} ref="comments" />
      </span>
    );
  }
}

EntryTlogLinkType.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default EntryTlogLinkType;
