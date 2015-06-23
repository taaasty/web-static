import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import Text from '../../../../../shared/react/components/common/Text';

export default class EntryTlogUnknownType {
  static propTypes = {
    entry: PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      rating: PropTypes.object.isRequired,
      tlog: PropTypes.object,
      comments_count: PropTypes.number.isRequired
    }).isRequired,
    hasModeration: PropTypes.bool.isRequired,
    onEntryAccept: PropTypes.func.isRequired,
    onEntryDecline: PropTypes.func.isRequired
  }
  render() {
    return (
      <span>
        <header className="post__header">
          {
            this.props.entry.is_voteable && (
              <Voting entryID={this.props.entry.id} rating={this.props.entry.rating} />
            )
          }
          {this.renderTitle()}
        </header>
        <div className="post__content">
          <Text value={i18n.t('entry.unknown_type')} />
        </div>
      </span>
    );
  }
  renderTitle() {
    if (this.props.entry.title) {
      return <h1 className="post__title">{this.props.title}</h1>;
    }
  }
}