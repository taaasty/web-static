import React, { PropTypes } from 'react';
import Text from '../../../../../shared/react/components/common/Text';
import LazyLoadImage from '../../../../../shared/react/components/common/LazyLoadImage';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';
import { brickWidth } from './constants';

let EntryBrickImageType = React.createClass({
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
          <a href={this.props.entry.url} className="brick__link">
            {this.renderBrickImage()}
          </a>
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
          onDecline={this.props.onEntryDecline}
        />
      </span>
    );
  },

  renderBrickImage() {
    if (this.props.entry.preview_image) {
      return <LazyLoadImage image={this.props.entry.preview_image} maxWidth={brickWidth} />;
    } else {
      return <span>{i18n.t('entry.has_no_images')}</span>;
    }
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
  }
});

export default EntryBrickImageType;
