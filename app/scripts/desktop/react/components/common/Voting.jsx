import React, { Component, PropTypes, findDOMNode } from 'react';
import classNames from 'classnames';
import EntryActionCreators from '../../actions/Entry';

export default class Voting extends Component {
  static propTypes = {
    rating: PropTypes.shape({
      votes: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reasons: PropTypes.array,
      is_voted: PropTypes.bool.isRequired,
      is_voteable: PropTypes.bool.isRequired
    }).isRequired,
    entryID: PropTypes.number.isRequired
  }
  state = {
    votes: this.props.rating.votes,
    rating: this.props.rating.rating,
    reasons: this.props.rating.reasons,
    canVote: this.props.rating.is_voteable,
    isVoted: this.props.rating.is_voted,
    isProcess: false
  }
  componentDidMount() {
    $(findDOMNode(this)).tooltip({
      html: true,
      placement: 'top',
      container: 'body'
    });
  }
  componentWillUnmount() {
    $(findDOMNode(this)).tooltip('destroy');
  }
  render() {
    const votingClasses = classNames('voting', {
      'votable': this.state.canVote,
      'unvotable': !this.state.canVote,
      'voted': this.state.isVoted
    });

    return (
      <span
        data-original-title={this.getTitle.call(this)}
        className={votingClasses}
        onClick={this.handleClick.bind(this)}
      >
        {this.state.isProcess ? <Spinner size={8} /> : this.state.votes}
      </span>
    );
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

    this.setState({ isProcess: true });
    EntryActionCreators.vote(this.props.entryID)
      .then((rating) => {
        this.setState({
          votes: rating.votes,
          rating: rating.rating,
          reasons: rating.reasons,
          isVoted: rating.is_voted,
          canVote: rating.is_voteable
        });
      })
      .always(() => this.setState({ isProcess: false }))
  }
}