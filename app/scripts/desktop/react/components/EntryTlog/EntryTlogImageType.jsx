import React, { Component, PropTypes } from 'react';
import Voting from '../common/Voting';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import ImageAttachmentsCollage from '../../../../shared/react/components/common/imageAttachmentsCollage';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';
import EntryTlogContentLink from './EntryTlogContentLink';

class EntryTlogImageType extends Component {
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
  renderActions() {
    if (this.props.hasModeration) {
      return <EntryTlogActions {...this.props} />;
    }
  }
  render() {
    const { entry, isFeed, isInList } = this.props;
    const { image_attachments, is_private, title } = entry;

    return (
      <span>
        <div className="post__content">
          <EntryTlogContentLink
            entry={entry}
            isFeed={isFeed}
            show={isInList}
          >
            <ImageAttachmentsCollage
              imageAttachments={image_attachments}
              width={712}
            />
          </EntryTlogContentLink>
          {this.renderVoting()}
          {is_private && <PrivacyBadge />}
          <EntryTlogContentLink
            entry={entry}
            isFeed={isFeed}
            show={isInList}
          >
            <Text value={title} withHTML />
          </EntryTlogContentLink>
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

EntryTlogImageType.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  isFeed: PropTypes.bool,
  isInList: PropTypes.bool,
};

export default EntryTlogImageType;
