import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogCommentsContainer from './EntryTlogCommentsContainer';
import EntryTlogContentLink from './EntryTlogContentLink';

class EntryTlogTextType extends Component {
  startComment() {
    this.refs.comments.getWrappedInstance().startComment();
  }
  renderTitle() {
    const title = this.props.entry.get('title');

    if (title) {
      return (
        <h1 className="post__title">
          {title}
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
      isInList,
    } = this.props;

    return (
      <span>
        <header className="post__header">
          {!!entry.get('isPrivate') && <PrivacyBadge />}
          {this.renderTitle()}
        </header>
        <EntryTlogContentLink
          entry={entry}
          show={isInList}
        >
          <div className="post__content">
            <Text value={entry.get('text')} withHTML />
          </div>
        </EntryTlogContentLink>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={this.startComment.bind(this)} />
        </div>
        {this.renderActions()}
        <EntryTlogCommentsContainer {...this.props} ref="comments" />
      </span>
    );
  }
}

EntryTlogTextType.propTypes = {
  entry: PropTypes.object.isRequired,
  entryState: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  isInList: PropTypes.bool,
};

export default EntryTlogTextType;
