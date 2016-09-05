import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogCommentsContainer from './EntryTlogCommentsContainer';
import Embed from '../Embed';

class EntryTlogVideoType extends Component {
  startComment() {
    this.refs.comments.getWrappedInstance().startComment();
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
    const embedHtml = entry.getIn(['iframely', 'html']);
    const isPrivate = entry.get('isPrivate');
    const title = entry.get('title');

    return (
      <span>
        <div className="post__content">
          <Embed
            autoplay={false}
            embedHtml={embedHtml}
            frameHeight={400}
            frameWidth={712}
          />
          <div className="video_comment">
            {!!isPrivate && <PrivacyBadge />}
            <Text value={title} withHTML />
          </div>
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

EntryTlogVideoType.propTypes = {
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
};

export default EntryTlogVideoType;
