###* @jsx React.DOM ###

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

    return `<button className={ 'follow-button ' + rootClass }
                    onClick={ this.onClick }
                    onMouseOver={ this.onMouseOver }
                    onMouseLeave={ this.onMouseLeave }>
              { this._getTitle() }
            </button>`

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
    return 'ошибка'       if @state.isError
    return 'в процессе..' if @state.isProcess

    if @state.isHover
      switch @state.relationship.state
        when STATE_FRIEND    then 'Отписаться'
        when STATE_REQUESTED then 'Отменить запрос'
        when STATE_IGNORED   then 'Разблокировать'
        when STATE_GUESSED
          if @state.relationship.user.is_privacy then 'Отправить запрос' else 'Подписаться'
        when STATE_NONE
          if @state.relationship.user.is_privacy then 'Отправить запрос' else 'Подписаться'
        else
          console.log 'Неизвестный статус', @state.relationship.state
          'Неизвестный статус'
    else
      switch @state.relationship.state
        when STATE_FRIEND    then 'Подписан'
        when STATE_REQUESTED then 'Ждём одобрения'
        when STATE_IGNORED   then 'Заблокирован'
        when STATE_GUESSED
          if @state.relationship.user.is_privacy then 'Отправить запрос' else 'Подписаться'
        when STATE_NONE
          if @state.relationship.user.is_privacy then 'Отправить запрос' else 'Подписаться'
        else
          console.log 'Неизвестный статус', @state.relationship.state
          'Неизвестный статус'