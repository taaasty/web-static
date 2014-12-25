cx               = require 'react/lib/cx'
EntryViewActions = require '../../../actions/view/entry'
ComponentMixin   = require '../../../mixins/component'
{ PropTypes } = React

#FIXME: Quantity of votes from EntryStore via props, instead of direct setState

EntryMetaVoting = React.createClass
  displayName: 'EntryMetaVoting'
  mixins: [ComponentMixin]

  propTypes:
    rating:  PropTypes.object.isRequired
    entryId: PropTypes.number.isRequired

  getInitialState: ->
    canVote: @props.rating.is_voteable
    voted:   @props.rating.is_voted
    votes:   @props.rating.votes

  render: ->
    votingClasses = cx
      'meta-voting': true
      'voted': @isVoted()
      'votable': @isVoteable()
      'unvotable': !@isVoteable()

    return <div className={ votingClasses }
                onClick={ @handleClick }>
             { @state.votes }
           </div>

  isVoted:    -> @state.voted
  isVoteable: -> @state.canVote

  vote: ->
    EntryViewActions.vote @props.entryId
      .then (rating) =>
        @safeUpdateState
          canVote: rating.is_voteable
          voted:   rating.is_voted
          votes:   rating.votes

  handleClick: ->
    return if @isVoted() || !@isVoteable()
    @vote()

module.exports = EntryMetaVoting