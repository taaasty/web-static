import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { voteEntry } from '../../actions/EntryActions';
import Voting from './Voting';
import { onlyUpdateForKeys } from 'recompose';

const emptyRating = Map();

class VotingContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      isFetching,
      rating,
    } = this.props;

    return (
      rating !== nextProps.rating ||
      isFetching !== nextProps.isFetching
    );
  }
  handleClick() {
    const {
      rating,
      voteEntry,
    } = this.props;

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
    const {
      isFetching,
      rating,
    } = this.props;

    return (
      <Voting
        isFetching={isFetching}
        onVote={this.handleClick.bind(this)}
        rating={rating}
      />
    );
  }
}

VotingContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  rating: PropTypes.object.isRequired,
  ratingId: PropTypes.number.isRequired,
  voteEntry: PropTypes.func.isRequired,
};

export default connect(
  (state, { ratingId }) => {
    const rating = state.entities.getIn([ 'rating', String(ratingId) ], emptyRating);
    const isFetching = state.ratingState.getIn([ rating.get('entryId'), 'isFetching' ], false);

    return {
      isFetching,
      rating,
      ratingId,
    };
  },
  {
    voteEntry,
  }
)(onlyUpdateForKeys([
  'isFetching',
  'rating',
  'ratingId',
])(VotingContainer));
