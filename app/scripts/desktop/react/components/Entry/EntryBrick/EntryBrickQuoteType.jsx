import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

let EntryBrickQuoteType = React.createClass({
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
        <div className="brick__body">
          <a href={this.props.entry.url} className="brick__link">
            <blockquote className="blockquote">
              <span className="laquo">«</span>{this.props.entry.text_truncated}<span className="raquo">»</span>
              {this.renderQuoteSource()}
            </blockquote>
          </a>
        </div>
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

  renderQuoteSource() {
    if (this.props.entry.source_truncated) {
      return (
        <span className="blockquote__caption">—
          <span className="blockquote__source">
            <i>{this.props.entry.source_truncated}</i>
          </span>
        </span>
      );
    }
  }
});

export default EntryBrickQuoteType;
