import React, { PropTypes } from 'react';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

let EntryBrickQuoteType = React.createClass({
  propTypes: {
    entry: PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      text_truncated: PropTypes.string.isRequired,
      source_truncated: PropTypes.string,
      rating: PropTypes.object.isRequired,
      tlog: PropTypes.object,
      comments_count: PropTypes.number.isRequired,
    }).isRequired,
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
            commentsCount={this.props.entry.comments_count}
            entryID={this.props.entry.id}
            host_tlog_id={this.props.host_tlog_id}
            rating={this.props.entry.rating}
            tlog={this.props.entry.tlog}
            url={this.props.entry.url}
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
