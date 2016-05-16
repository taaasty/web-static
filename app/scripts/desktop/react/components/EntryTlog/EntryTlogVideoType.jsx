import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import Text from '../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogCommentsContainer from './EntryTlogCommentsContainer';

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
    const { iframely, isPrivate, isVoteable, rating, title } = this.props.entry;

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
            {!!isPrivate && <PrivacyBadge />}
            <Text value={title} withHTML={true} />
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
