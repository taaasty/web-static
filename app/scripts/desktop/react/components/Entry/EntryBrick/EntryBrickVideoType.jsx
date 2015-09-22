import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import Text from '../../../../../shared/react/components/common/Text';
import Image from '../../../../../shared/react/components/common/Image';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

const brickWidth = 302;

let EntryBrickVideoType = React.createClass({
  propTypes: {
    entry: ProjectTypes.tlogEntry.isRequired,
    hasModeration: PropTypes.bool.isRequired,
    host_tlog_id: PropTypes.number,
    onEntryAccept: PropTypes.func.isRequired,
    onEntryDecline: PropTypes.func.isRequired,
  },

  render() {
    return (
      <span>
        <div className="brick__media">
          <figure className="video">
            <a href={this.props.entry.url}>
              <div className="video__cover">
                <Image image={this.props.entry.preview_image} maxWidth={brickWidth} />
                {this.renderVideoOverlay()}
              </div>
            </a>
          </figure>
        </div>
        {this.renderBrickBody()}
        <div className="brick__meta">
          <EntryBrickMetabar
            entry={this.props.entry}
            host_tlog_id={this.props.host_tlog_id}
          />
        </div>
        <EntryBrickActions
            hasModeration={this.props.hasModeration}
            onAccept={this.props.onEntryAccept}
            onDecline={this.props.onEntryDecline} />
      </span>
    );
  },

  renderBrickBody() {
    if (this.props.entry.title_truncated) {
      return (
        <div className="brick__body">
          <div className="brick__text">
            <a href={this.props.entry.url} title={this.props.entry.title_truncated} className="brick__link">
              <Text value={this.props.entry.title_truncated} withHTML={true} />
            </a>
          </div>
        </div>
      );
    }
  },

  renderVideoOverlay() {
    if (this.props.entry.is_playable) {
      return <div className="video__overlay" />;
    }
  }
});

export default EntryBrickVideoType;
