import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';
import EntryTlogContentLink from './EntryTlogContentLink';

class EntryTlogCodeType extends Component {
  startComment() {
    this.refs.comments.startComment();
  }
  renderTitle() {
    const { title } = this.props.entry;

    if (title) {
      return (
        <h1 className="post__title">{title}</h1>
      );
    }
  }
  renderActions() {
    if (this.props.hasModeration) {
      return <EntryTlogActions {...this.props} />;
    }
  }
  render() {
    const { isFeed, isInList, entry } = this.props;
    const { isPrivate, text } = entry;

    return (
      <span>
        <header className="post__header">
          {isPrivate && <PrivacyBadge />}
          {this.renderTitle()}
        </header>
        <EntryTlogContentLink
          entry={entry}
          isFeed={isFeed}
          show={isInList}
        >
          <div className="post__content">
            <pre>
              <Text value={text} withHTML />
            </pre>
          </div>
        </EntryTlogContentLink>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={this.startComment.bind(this)} />
        </div>
        {this.renderActions()}
        <EntryTlogComments {...this.props} ref="comments" />
      </span>
    );
  }
}

EntryTlogCodeType.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  isFeed: PropTypes.bool,
  isInList: PropTypes.bool,
};

export default EntryTlogCodeType;
