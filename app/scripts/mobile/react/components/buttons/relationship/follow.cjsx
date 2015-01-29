cx                      = require 'react/lib/cx'
RelationshipsStore      = require '../../../stores/relationships'
RelationshipButtonMixin = require './mixins/relationship'
ComponentMixin          = require '../../../mixins/component'
ConnectStoreMixin       = require '../../../../../shared/react/mixins/connectStore'
{ PropTypes } = React

SHOW_STATE    = 'show'
ERROR_STATE   = 'error'
PROCESS_STATE = 'process'

FRIEND_STATUS    = 'friend'
REQUESTED_STATUS = 'requested'
IGNORED_STATUS   = 'ignored'
GUESSED_STATUS   = 'guessed'
NONE_STATUS      = 'none'

FollowButton = React.createClass
  displayName: 'FollowButton'
  mixins: [ConnectStoreMixin(RelationshipsStore), RelationshipButtonMixin, ComponentMixin]

  propTypes:
    user:   PropTypes.object.isRequired
    status: PropTypes.string.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    buttonClasses = cx
      'follow-button': true
      '__active': @isFollowStatus() && @isShowState()

    if @state.status?
      # Inline-block need to prevent AdBlock social buttons hiding
      <button style={{ display: 'inline-block!important' }}
              className={ buttonClasses }
              onClick={ @handleClick }>
        { @getTitle() }
      </button>
    else null

  isShowState:  -> @state.currentState is SHOW_STATE
  isErrorState: -> @state.currentState is ERROR_STATE

  isFollowStatus: -> @state.status is FRIEND_STATUS
  isTlogPrivate:  -> @props.user.is_privacy

  activateProcessState: -> @safeUpdateState(currentState: PROCESS_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)
  activateShowState:    -> @safeUpdateState(currentState: SHOW_STATE)

  getTitle: ->
    switch @state.currentState
      when ERROR_STATE   then return i18n.t 'follow_button_error'
      when PROCESS_STATE then return i18n.t 'follow_button_process'

    switch @state.status
      when FRIEND_STATUS    then i18n.t 'follow_button_subscribed'
      when REQUESTED_STATUS then i18n.t 'follow_button_requested'
      when IGNORED_STATUS   then i18n.t 'follow_button_ignored'
      when GUESSED_STATUS, NONE_STATUS
        if @isTlogPrivate() then i18n.t 'follow_button_send_request' else i18n.t 'follow_button_subscribe'
      else console.warn 'Unknown follow status of FollowButton component', @state.status

  handleClick: ->
    userId = @props.user.id

    if @isShowState()
      switch @state.status
        when FRIEND_STATUS    then @unfollow userId
        when REQUESTED_STATUS then @cancel userId
        when IGNORED_STATUS   then @cancel userId
        when GUESSED_STATUS   then @follow userId
        when NONE_STATUS      then @follow userId
        else console.warn 'Unknown follow status of FollowButton component', @state.status

  getStateFromStore: ->
    status: RelationshipsStore.getStatus(@props.user.id) || @props.status

module.exports = FollowButton