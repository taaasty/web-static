import classnames from 'classnames';
import EntryActionCreators from '../../actions/Entry';

let Voting = React.createClass({
  propTypes: {
    rating: React.PropTypes.shape({
      votes: React.PropTypes.number.isRequired,
      rating: React.PropTypes.number.isRequired,
      is_voted: React.PropTypes.bool.isRequired,
      is_voteable: React.PropTypes.bool.isRequired
    }).isRequired,
    entryID: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      canVote: this.props.rating.is_voteable,
      isVoted: this.props.rating.is_voted,
      votes: this.props.rating.votes,
      rating: this.props.rating.rating,
      process: false
    };
  },

  componentDidMount() {
    $(this.getDOMNode()).tooltip({
      placement: 'top',
      container: 'body'
    });
  },

  componentWillUnmount() {
    $(this.getDOMNode()).tooltip('destroy');
  },

  render() {
    let votingClasses = classnames('voting', {
      'votable': this.state.canVote,
      'unvotable': !this.state.canVote,
      'voted': this.state.isVoted
    });

    let content = this.state.process ? <Spinner size={8} /> : this.state.votes;

    return (
      <span data-original-title={this.getTitle()}
            className={votingClasses}
            onClick={this.handleClick}>
        {content}
      </span>
    );
  },

  getTitle() {
    if (this.state.canVote && !this.state.isVoted) {
      return i18n.t('vote');
    } else if (this.state.isVoted) {
      return i18n.t('voted');
    } else {
      return i18n.t('cant_vote');
    }
  },

  handleClick() {
    if (this.state.isVoted || !this.state.canVote) return;

    this.setState({process: true});

    EntryActionCreators.vote(this.props.entryID)
      .then((rating) => {
        if (this.isMounted()) {
          this.setState({
            votes: rating.votes,
            rating: rating.rating,
            isVoted: rating.is_voted,
            canVote: rating.is_voteable
          });
        }
      })
      .always(() => {
        if (this.isMounted()) this.setState({process: false});
      });
  }
});

export default Voting;