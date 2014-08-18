###* @jsx React.DOM ###

STATE_NONE      = 'none'
STATE_FRIEND    = 'friend'
STATE_REQUESTED = 'requested'
STATE_IGNORED   = 'ignored'

window.FollowButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired

  getInitialState: ->
    relationship: @props.relationship
    isHover:      false
    isError:      false
    isProcess:    false

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
      else @follow()

  onMouseOver:  -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false

  _getTitle: ->
    return 'ошибка'       if @state.isError
    return 'в процессе..' if @state.isProcess

    if @state.isHover
      switch @state.relationship.state
        when STATE_FRIEND    then 'Отписаться'
        when STATE_REQUESTED then 'Отменить запрос'
        when STATE_IGNORED   then 'Разблокировать'
        when STATE_NONE
          if @state.relationship.user.is_privacy then 'Отправить запрос' else 'Подписаться'
    else
      switch @state.relationship.state
        when STATE_FRIEND    then 'Подписан'
        when STATE_REQUESTED then 'Ждём одобрения'
        when STATE_IGNORED   then 'Заблокирован'
        when STATE_NONE
          if @state.relationship.user.is_privacy then 'Отправить запрос' else 'Подписаться'