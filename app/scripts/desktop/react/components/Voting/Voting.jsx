/*global i18n */
import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';
import Spinner from '../../../../shared/react/components/common/Spinner';

class Voting extends Component {
  componentDidMount() {
    $(this.refs.container).tooltip({
      html: true,
      placement: 'top',
      container: 'body',
    });
  }
  componentWillUnmount() {
    $(this.refs.container).tooltip('destroy');
  }
  getTitle() {
    const { rating } = this.props;
    const isVoteable = rating.get('isVoteable', false);
    const isVoted = rating.get('isVoted', false);
    const reasons = rating.get('reasors', List());

    if (isVoteable && !isVoted) {
      return i18n.t('vote');
    } else if (isVoted) {
      return i18n.t('voted');
    } else if (reasons.size) {
      return reasons.join('<br />');
    } else {
      return i18n.t('cant_vote');
    }
  }
  handleClick() {
    const { onVote, rating } = this.props;
    if (rating.get('isVoted') || !rating.get('isVoteable')) {
      return;
    }

    onVote();
  }
  render() {
    const { isVoting, rating } = this.props;
    const isVoteable = rating.get('isVoteable');
    const votingClasses = classNames('voting', {
      'votable': isVoteable,
      'unvotable': !isVoteable,
      'voted': rating.get('isVoted'),
    });

    return (
      <span
        className={votingClasses}
        data-original-title={this.getTitle()}
        onClick={this.handleClick.bind(this)}
        ref="container"
      >
        {isVoting ? <Spinner size={8} /> : rating.get('votes')}
      </span>
    );
  }
}

Voting.propTypes = {
  isVoting: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired,
  rating: PropTypes.object.isRequired,
};

export default Voting;
