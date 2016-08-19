import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogCommentsContainer from './EntryTlogCommentsContainer';

class EntryTlogLinkType extends Component {
  startComment() {
    this.refs.comments.getWrappedInstance().startComment();
  }
  renderTitle() {
    const {
      entry,
    } = this.props;
    const title = entry.get('title');
    const link = entry.get('link');

    if (title) {
      return (
        <h1 className="post__title">
          <a
            className="post__link"
            href={link}
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
    const {
      entry,
    } = this.props;
    const isPrivate = entry.get('isPrivate');
    const text = entry.get('text');

    return (
      <span>
        <header className="post__header">
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
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
};

export default EntryTlogLinkType;
