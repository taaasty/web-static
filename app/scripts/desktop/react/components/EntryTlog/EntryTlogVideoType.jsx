import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';

class EntryTlogVideoType extends Component {
  startComment() {
    this.refs.comments.startComment();
  }
  renderActions() {
    if (this.props.hasModeration) {
      return <EntryTlogActions {...this.props} />;
    }
  }
  render() {
    const { iframely, is_private, title } = this.props.entry;

    return (
      <span>
        <div className="post__content">
          <EmbedComponent
            autoplay={false}
            frameWidth={712}
            frameHeight={400}
            embedHtml={iframely.html}
          />
          <div className="video_comment">
            {is_private && <PrivacyBadge />}
            <Text value={title} withHTML={true} />
          </div>
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

EntryTlogVideoType.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
};

export default EntryTlogVideoType;
