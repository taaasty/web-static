import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import PrivacyBadge from '../../common/PrivacyBadge';
import Text from '../../../../../shared/react/components/common/Text';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';

export default class EntryTlogUnknownType {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    hasModeration: PropTypes.bool.isRequired
  }
  render() {
    const { is_private } = this.props.entry;

    return (
      <span>
        <header className="post__header">
          {this.renderVoting()}
          {is_private && <PrivacyBadge />}
          {this.renderTitle()}
        </header>
        <div className="post__content">
          <Text value={i18n.t('entry.unknown_type')} />
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
      return <h1 className="post__title">{this.props.title}</h1>;
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
