STATE_FRIEND    = 'friend'
STATE_REQUESTED = 'requested'
STATE_IGNORED   = 'ignored'
STATE_GUESSED   = 'guessed'
STATE_NONE      = 'none'

window.FollowButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired

  getInitialState: ->
    relationship: @props.relationship
    isHover:      false
    isError:      false
    isProcess:    false

  componentDidMount: ->
    TastyEvents.on TastyEvents.keys.follow_status_changed(@state.relationship.user_id), @updateFollowStatus

  componentWillUnmount: ->
    TastyEvents.off TastyEvents.keys.follow_status_changed(@state.relationship.user_id), @updateFollowStatus

  render: ->
    if @isFollow() && !@state.isError && !@state.isProcess
      rootClass = 'state--active'

    # Inline-block need to prevent AdBlock social buttons hiding
    return <button style={{ display: 'inline-block!important' }}
                   className={ 'follow-button ' + rootClass }
                   onClick={ this.onClick }
                   onMouseOver={ this.onMouseOver }
                   onMouseLeave={ this.onMouseLeave }>
             { this._getTitle() }
           </button>

  isFollow: -> @state.relationship.state == STATE_FRIEND

  onClick: ->
    switch @state.relationship.state
      when STATE_FRIEND    then @unfollow()
      when STATE_REQUESTED then @cancel()
      when STATE_IGNORED   then @cancel()
      when STATE_GUESSED   then @follow()
      when STATE_NONE      then @follow()
      else console.warn 'Неизвестный статус', @state.relationship.state

  onMouseOver:  -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false

  updateFollowStatus: (newStatus) ->
    newRelationship = @state.relationship
    newRelationship.state = newStatus

    @setState(relationship: newRelationship)

  _getTitle: ->
    return i18n.t 'follow_button_error'   if @state.isError
    return i18n.t 'follow_button_process' if @state.isProcess

    if @state.isHover
      switch @state.relationship.state
        when STATE_FRIEND    then i18n.t 'follow_button_unsubscribe'
        when STATE_REQUESTED then i18n.t 'follow_button_cancel'
        when STATE_IGNORED   then i18n.t 'follow_button_unblock'
        when STATE_GUESSED
          if @state.relationship.user.is_privacy then i18n.t 'follow_button_send_request' else i18n.t 'follow_button_subscribe'
        when STATE_NONE
          if @state.relationship.user.is_privacy then i18n.t 'follow_button_send_request' else i18n.t 'follow_button_subscribe'
        else console.log 'Неизвестный статус', @state.relationship.state
    else
      switch @state.relationship.state
        when STATE_FRIEND    then i18n.t 'follow_button_subscribed'
        when STATE_REQUESTED then i18n.t 'follow_button_requested'
        when STATE_IGNORED   then i18n.t 'follow_button_ignored'
        when STATE_GUESSED
          if @state.relationship.user.is_privacy then i18n.t 'follow_button_send_request' else i18n.t 'follow_button_subscribe'
        when STATE_NONE
          if @state.relationship.user.is_privacy then i18n.t 'follow_button_send_request' else i18n.t 'follow_button_subscribe'
        else console.log 'Неизвестный статус', @state.relationship.state