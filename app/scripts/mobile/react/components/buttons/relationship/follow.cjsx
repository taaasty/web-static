cx = require 'react/lib/cx'
RelationshipButtonMixin = require './mixins/relationship'
{ PropTypes } = React

SHOW_STATE    = 'show'
ERROR_STATE   = 'error'
PROCESS_STATE = 'process'

FRIEND_STATUS    = 'friend'
REQUESTED_STATUS = 'requested'
IGNORED_STATUS   = 'ignored'
GUESSED_STATUS   = 'guessed'
NONE_STATUS      = 'none'

#TODO: i18n
ERROR_TITLE          = 'Ошибка'
PROCESS_TITLE        = 'В процессе..'
SUBSCRIBE_TITLE      = 'Подписаться'
UNSUBSCRIBE_TITLE    = 'Отписаться'
CANCEL_REQUEST_TITLE = 'Отменить запрос'
UNBLOCK_TITLE        = 'Разблокировать'
SEND_REQUEST_TITLE   = 'Отправить запрос'
SUBSCRIBED_TITLE     = 'Подписан'
REQUESTED_TITLE      = 'Ждём одобрения'
IGNORED_TITLE        = 'Заблокирован'

FollowButton = React.createClass
  mixins: [RelationshipButtonMixin]

  propTypes:
    relationship: PropTypes.object.isRequired

  getInitialState: ->
    currentState: SHOW_STATE
    relationship: @props.relationship

  render: ->
    buttonClasses = cx
      'follow-button': true
      '__active': @isFollowStatus() && @isShowState()

    return <button
               className={ buttonClasses }
               onClick={ this.handleClick }>
             { this._getTitle() }
           </button>

  isShowState: -> @state.currentState is SHOW_STATE

  isFollowStatus: -> @state.relationship.state is FRIEND_STATUS
  isTlogPrivate:  -> @state.relationship.user.is_privacy

  _getTitle: ->
    switch @state.currentState
      when ERROR_STATE   then return ERROR_TITLE
      when PROCESS_STATE then return PROCESS_TITLE

    followStatus = @state.relationship.state

    switch followStatus
      when FRIEND_STATUS    then SUBSCRIBED_TITLE
      when REQUESTED_STATUS then REQUESTED_TITLE
      when IGNORED_STATUS   then IGNORED_TITLE
      when GUESSED_STATUS, NONE_STATUS
        if @isTlogPrivate() then SEND_REQUEST_TITLE else SUBSCRIBE_TITLE
      else console.warn 'Unknown follow status of FollowButton component', followStatus

  handleClick: ->
    switch @state.relationship.state
      when FRIEND_STATUS    then @unfollow()
      when REQUESTED_STATUS then @cancel()
      when IGNORED_STATUS   then @cancel()
      when GUESSED_STATUS   then @follow()
      when NONE_STATUS      then @follow()
      else console.warn 'Unknown follow status of FollowButton component', @state.relationship.state

module.exports = FollowButton