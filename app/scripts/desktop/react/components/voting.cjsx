classnames = require 'classnames'
PureRenderMixin = require 'react/lib/ReactComponentWithPureRenderMixin'

window.Voting = React.createClass
  mixins: [RequesterMixin, ComponentManipulationsMixin, PureRenderMixin]

  propTypes:
    entryId:    React.PropTypes.number.isRequired
    isVoteable: React.PropTypes.bool.isRequired
    isVoted:    React.PropTypes.bool.isRequired
    votes:      React.PropTypes.number.isRequired
    rating:     React.PropTypes.number.isRequired

  getInitialState: ->
    canVote: @props.isVoteable
    isVoted: @props.isVoted
    votes:   @props.votes
    rating:  @props.rating
    process: false

  componentDidMount: ->
    $voting = $( @getDOMNode() )
    $voting.tooltip placement: 'top'

  componentWillUnmount: ->
    $voting = $( @getDOMNode() )
    $voting.tooltip 'destroy'

  render: ->
    title = @getTitle()
    votingClasses = classnames('voting', {
      'votable':    @state.canVote
      'unvotable': !@state.canVote
      'voted':      @state.isVoted
    })

    votes = if @state.process then <Spinner size={ 8 } /> else @state.votes

    return <span className={ votingClasses }
                 data-original-title={ title }
                 onClick={ this.handleClick }>
             { votes }
           </span>

  handleClick: ->
    return if @state.isVoted || !@state.canVote

    @setState(process: true)

    @createRequest
      url: ApiRoutes.votes_url @props.entryId
      method: 'POST'
      success: (data) =>
        @safeUpdateState {
          isVoted: data.is_voted
          canVote: data.is_voteable
          votes:   data.votes
          rating:  data.votes
        }
      complete: =>
        @safeUpdateState(process: false)

  getTitle: ->
    if @state.canVote && !@state.isVoted
      title = i18n.t 'vote'
    else if @state.isVoted
      title = i18n.t 'voted'
    else
      title = i18n.t 'cant_vote'

     '(Рейтинг ' + @state.rating + ') ' + title