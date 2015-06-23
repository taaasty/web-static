import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import Text from '../../../../../shared/react/components/common/Text';
import ImageAttachmentsCollage from '../../../../../shared/react/components/common/imageAttachmentsCollage';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';

export default class EntryTlogImageType {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    hasModeration: PropTypes.bool.isRequired
  }
  render() {
    return (
      <div className="post__content">
        <ImageAttachmentsCollage
            imageAttachments={this.props.entry.image_attachments}
            width={712} />
        {this.renderVoting()}
        <Text value={this.props.entry.title} withHTML={true} />
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} />
        </div>
        {this.renderActions()}
      </div>
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
}