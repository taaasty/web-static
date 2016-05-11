/*global i18n */
import React, { Component, PropTypes } from 'react';
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
    const { canVote, rating: { isVoted, reasons=[] } } = this.props.entry;

    if (canVote && !isVoted) {
      return i18n.t('vote');
    } else if (isVoted) {
      return i18n.t('voted');
    } else if (reasons.length) {
      return reasons.join('<br />');
    } else {
      return i18n.t('cant_vote');
    }
  }
  handleClick() {
    const { canVote, rating: { isVoted } } = this.props.entry;
    if (isVoted || !canVote) {
      return;
    }

    this.props.onVote();
  }
  render() {
    const { canVote, rating: { isVoted, votes } } = this.props.entry;
    const votingClasses = classNames('voting', {
      'votable': canVote,
      'unvotable': !canVote,
      'voted': isVoted,
    });

    return (
      <span
        className={votingClasses}
        data-original-title={this.getTitle.call(this)}
        onClick={this.handleClick.bind(this)}
        ref="container"
      >
        {this.state.isProcess ? <Spinner size={8} /> : votes}
      </span>
    );
  }
}

Voting.propTypes = {
  entry: PropTypes.shape({
    canVote: PropTypes.bool.isRequired,
    isVoting: PropTypes.bool,
    rating: PropTypes.shape({
      isVoted: PropTypes.bool.isRequired,
      isVoteable: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired,
      reasons: PropTypes.array,
      votes: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onVote: PropTypes.func.isRequired,
};

export default Voting;
