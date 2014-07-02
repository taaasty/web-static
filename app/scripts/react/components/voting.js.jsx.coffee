###* @jsx React.DOM ###

window.Voting = React.createClass
  propTypes:
    isVoteable: React.PropTypes.bool
    isVoted:    React.PropTypes.bool
    votes:      React.PropTypes.number
    rating:     React.PropTypes.number
    entryId:    React.PropTypes.number

  getInitialState: (a,b,c)->
    return {
      isVoteable: @props.isVoteable
      isVoted:    @props.isVoted
      votes:      @props.votes
      rating:     @props.rating
      process:    false
    }

  # Почему-то React.addons не доступен
  #mixins: [React.addons.ReactComponentWithPureRenderMixin]

  handleClick: (e)->
    return if @state.isVoted

    @setState process: true
    $.ajax
      url:     Routes.api.votes_url(@props.entryId)
      method:  @ajaxMethod()
      success: (data)=>
        @setState
          isVoted:    data.is_voted
          isVoteable: data.is_voteable
          votes:      data.votes
          rating:     data.votes

      complete: =>
        @setState process: false

  shouldComponentUpdate: (nextProps, nextState) ->
    res = !_.isEqual(nextProps, @props) || !_.isEqual(nextState, @state)

  render: ->
    return `<span className={this.votableClass()}
                  onClick={this.handleClick}
                  title={this.title()}>{this.ratingValue()}</span>`

  ajaxMethod: ->
      if @state.isVoted then method = 'DELETE' else method = 'POST'

  ratingValue: ->
    if @state.process
      '·' # TODO заменить на спиннер
    else
      @state.rating

  title: ->
    if @state.isVoted
      i18n.t 'votes.unvote'
    else
      i18n.t 'votes.vote'

  votableClass: ->
    votableClass = 'rating'
    votableClass += ' votable' if @state.isVoteable
    votableClass += ' voted'   if @state.isVoted

    return votableClass
