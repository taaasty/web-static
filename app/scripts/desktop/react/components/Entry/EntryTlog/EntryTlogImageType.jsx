import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import Text from '../../../../../shared/react/components/common/Text';
import ImageAttachmentsCollage from '../../../../../shared/react/components/common/imageAttachmentsCollage';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';

export default class EntryTlogImageType {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    hasModeration: PropTypes.bool.isRequired
  }
  render() {
    return (
      <span>
        <div className="post__content">
          <ImageAttachmentsCollage
              imageAttachments={this.props.entry.image_attachments}
              width={712} />
          {this.renderVoting()}
          <Text value={this.props.entry.title} withHTML={true} />
        </div>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={::this.startComment} />
        </div>
        {this.renderActions()}
        <EntryTlogComments {...this.props} ref="comments" />
      </span>
    );
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
  startComment() {
    this.refs.comments.startComment();
  }
}