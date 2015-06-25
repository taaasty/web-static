import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import Text from '../../../../../shared/react/components/common/Text';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';

export default class EntryTlogCodeType {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    hasModeration: PropTypes.bool.isRequired
  }
  render() {
    return (
      <span>
        <header className="post__header">
          {this.renderVoting()}
          {this.renderTitle()}
        </header>
        <div className="post__content">
          <pre>
            <Text value={this.props.entry.text} withHTML={true} />
          </pre>
        </div>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={::this.startComment} />
        </div>
        {this.renderActions()}
        <EntryTlogComments {...this.props} ref="comments" />
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
  renderTitle() {
    if (this.props.entry.title) {
      return (
        <h1 className="post__title">{this.props.entry.title}</h1>
      );
    }
  }
  renderActions() {
    if (this.props.hasModeration) {
      return <EntryTlogActions {...this.props} />;
    }
  }
  startComment() {
    this.refs.comments.startComment();
  }
}