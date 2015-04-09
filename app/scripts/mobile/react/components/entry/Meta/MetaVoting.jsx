import classSet from 'react/lib/cx';
import EntryViewActions from '../../../actions/view/entry';
import ComponentMixin from '../../../mixins/component';

let EntryMetaVoting = React.createClass({
  mixins: [ComponentMixin],

  propTypes: {
    rating: React.PropTypes.object.isRequired,
    entryId: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      canVote: this.props.rating.is_voteable,
      voted: this.props.rating.is_voted,
      votes: this.props.rating.votes
    }
  },

  render() {
    let votingClasses = classSet({
      'meta-voting': true,
      'voted': this.isVoted(),
      'votable': this.isVoteable(),
      'unvotable': !this.isVoteable()
    });

    return (
      <div className={votingClasses} onClick={this.handleClick}>
        {this.state.votes}
      </div>
    );
  },

  isVoted() {
    return this.state.voted;
  },

  isVoteable() {
    return this.state.canVote;
  },

  vote() {
    EntryViewActions.vote(this.props.entryId)
      .then(rating =>
        this.safeUpdateState({
          canVote: rating.is_voteable,
          voted: rating.is_voted,
          votes: rating.votes
        })
      );
  },

  handleClick() {
    if (this.isVoted() || !this.isVoteable()) { return; }
    this.vote();
  }
});

export default EntryMetaVoting;