import React, { Component, PropTypes } from 'react';
import Voting from '../common/Voting';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';

class EntryTlogLinkType extends Component {
  startComment() {
    this.refs.comments.startComment();
  }
  renderVoting() {
    if (this.props.entry.is_voteable) {
      return (
        <Voting entryID={this.props.entry.id} rating={this.props.entry.rating} />
      );
    }
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
    const { is_private, text } = this.props.entry;

    return (
      <span>
        <header className="post__header">
          {this.renderVoting()}
          {is_private && <PrivacyBadge />}
          {this.renderTitle()}
        </header>
        <div className="post__content">
          <Text value={text} withHTML />
        </div>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={this.startComment.bind(this)} />
        </div>
        {this.renderActions()}
        <EntryTlogComments {...this.props} ref="comments" />
      </span>
    );
  }
}

EntryTlogLinkType.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
};

export default EntryTlogLinkType;
