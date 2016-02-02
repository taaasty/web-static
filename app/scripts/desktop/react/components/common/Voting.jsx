import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import EntryActionCreators from '../../actions/Entry';
import Spinner from '../../../../shared/react/components/common/Spinner';
import PostAuthService from '../../services/PostAuthService';

export default class Voting extends Component {
  static propTypes = {
    entryID: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      votes: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reasons: PropTypes.array,
      is_voted: PropTypes.bool.isRequired,
      is_voteable: PropTypes.bool.isRequired,
    }).isRequired,
  };
  state = {
    votes: this.props.rating.votes,
    rating: this.props.rating.rating,
    reasons: this.props.rating.reasons,
    canVote: this.props.rating.is_voteable,
    isVoted: this.props.rating.is_voted,
    isProcess: false,
  };
  componentDidMount() {
    $(findDOMNode(this)).tooltip({
      html: true,
      placement: 'top',
      container: 'body',
    });
  }
  componentWillUnmount() {
    $(findDOMNode(this)).tooltip('destroy');
  }
  getTitle() {
    if (this.state.canVote && !this.state.isVoted) {
      return i18n.t('vote');
    } else if (this.state.isVoted) {
      return i18n.t('voted');
    } else if (this.state.reasons.length) {
      return this.state.reasons.join('<br />');
    } else {
      return i18n.t('cant_vote');
    }
  }
  handleClick() {
    if (this.state.isVoted || !this.state.canVote) {
      return;
    }

    PostAuthService.run(
      'vote',
      () => {
        this.setState({ isProcess: true });
        EntryActionCreators.vote(this.props.entryID)
          .then((rating) => {
            this.setState({
              votes: rating.votes,
              rating: rating.rating,
              reasons: rating.reasons,
              isVoted: rating.is_voted,
              canVote: rating.is_voteable,
            });
          })
          .always(() => this.setState({ isProcess: false }));
      },
      this.props.entryID
    );
  }
  render() {
    const votingClasses = classNames('voting', {
      'votable': this.state.canVote,
      'unvotable': !this.state.canVote,
      'voted': this.state.isVoted,
    });

    return (
      <span
        className={votingClasses}
        data-original-title={this.getTitle.call(this)}
        onClick={this.handleClick.bind(this)}
      >
        {this.state.isProcess ? <Spinner size={8} /> : this.state.votes}
      </span>
    );
  }
}
