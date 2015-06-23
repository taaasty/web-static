import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import Text from '../../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';

export default class EntryTlogVideoType {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    hasModeration: PropTypes.bool.isRequired
  }
  render() {
    return (
      <div className="post__content">
        <EmbedComponent
            autoplay={false}
            frameWidth={712}
            frameHeight={400}
            embedHtml={this.props.entry.iframely.html} />
        <div className="video_comment">
          {this.renderVoting()}
          <Text value={this.props.entry.title} withHTML={true} />
        </div>
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