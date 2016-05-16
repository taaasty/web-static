import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { voteEntry } from '../../actions/EntryActions';
import Voting from './Voting';

class VotingContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const { isVoting, rating } = this.props;

    return (
      rating !== nextProps.rating ||
      isVoting !== nextProps.isVoting
    );
  }
  handleClick() {
    const { rating, voteEntry } = this.props;

    voteEntry(rating.get('entryId'))
      .then((data) => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'Like');
        }
        return data;
      });
    // TODO: restore PostAuth logic
  }
  render() {
    const { isVoting, rating } = this.props;

    return (
      <Voting
        isVoting={isVoting}
        onVote={this.handleClick.bind(this)}
        rating={rating}
      />
    );
  }
}

VotingContainer.propTypes = {
  isVoting: PropTypes.bool.isRequired,
  rating: PropTypes.object.isRequired,
  ratingId: PropTypes.number.isRequired,
  voteEntry: PropTypes.func.isRequired,
};

export default connect(
  (state, { ratingId }) => {
    const rating = state.entities.getIn([ 'rating', (ratingId || '').toString() ], Map());
    const isVoting = state.ratingState.getIn([ rating.get('entryId'), 'isVoting' ], false);
    
    return Object.assign({}, {
      isVoting,
      rating,
      ratingId,
    });
  },
  { voteEntry }
)(VotingContainer);
