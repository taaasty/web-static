import React, { Component, PropTypes } from 'react';
import Voting from '../../common/Voting';
import PrivacyBadge from '../../common/PrivacyBadge';
import Text from '../../../../../shared/react/components/common/Text';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';

class EntryTlogUnknownType extends Component {
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
}

EntryTlogUnknownType.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
};

export default EntryTlogUnknownType;
