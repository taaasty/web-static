import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import Text from '../../../../../shared/react/components/common/Text';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

let EntryBrickTextType = React.createClass({
  propTypes: {
    entry: ProjectTypes.tlogEntry.isRequired,
    hasModeration: PropTypes.bool.isRequired,
    host_tlog_id: PropTypes.number,
    onEntryAccept: PropTypes.func.isRequired,
    onEntryDecline: PropTypes.func.isRequired,
  },

  render() {
    const { entry, hasModeration, host_tlog_id, onEntryAccept, onEntryDecline } = this.props;
    
    return (
      <span>
        <div className="brick__body">
          {this.renderBrickTitle()}
          <div className="brick__text">
            <a href={entry.url} title={entry.title} className="brick__link">
              <Text value={entry.text_truncated} withHTML={true} />
            </a>
          </div>
        </div>
        <div className="brick__meta">
          <EntryBrickMetabar
            entry={entry}
            host_tlog_id={host_tlog_id}
          />
        </div>
        <EntryBrickActions
            hasModeration={hasModeration}
            onAccept={onEntryAccept}
            onDecline={onEntryDecline} />
      </span>
    );
  },

  renderBrickTitle() {
    if(this.props.entry.title) {
      return (
        <a href={this.props.entry.url} title={this.props.entry.title} className="brick__link">
          <h2 className="brick__title">{this.props.entry.title}</h2>
        </a>
      );
    }
  }
});

export default EntryBrickTextType;
