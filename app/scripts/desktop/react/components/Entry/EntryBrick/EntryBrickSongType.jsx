import React, { PropTypes } from 'react';
import Text from '../../../../../shared/react/components/common/Text';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

let EntryBrickSongType = React.createClass({
  propTypes: {
    entry: PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
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
          {this.renderBrickTitle()}
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

export default EntryBrickSongType;
