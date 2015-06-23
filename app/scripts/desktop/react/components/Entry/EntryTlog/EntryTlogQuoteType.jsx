import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';

export default class EntryTlogQuoteType {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    hasModeration: PropTypes.bool.isRequired
  }
  render() {
    return (
      <span>
        <header className="post__header">
          {this.renderVoting()}
        </header>
        <div className="post__content">
          <blockquote className="blockquote">
            <span className="laquo">«</span>{this.props.entry.text}<span className="raquo">»</span>
            {
              this.props.entry.source && (
                <span className="blockquote__caption">—
                  <span className="blockquote__source"> {this.props.entry.source}</span>
                </span>
              )
            }
          </blockquote>
        </div>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} />
        </div>
        {this.renderActions()}
      </span>
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