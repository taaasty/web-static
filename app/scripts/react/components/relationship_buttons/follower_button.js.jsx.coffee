###* @jsx React.DOM ###

STATE_FRIEND = 'friend'

window.RelationshipFollowerButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired

  getInitialState: ->
    relationship:   @props.relationship
    isHover:        false
    isError:        false
    isProcess:      false

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

  onClick: (e) ->
    switch @state.relationship.state
      when 'friend'    then @unfollow()
      when 'requested' then @cancel()
      when 'ignored'   then @cancel()
      else @follow()

  onMouseOver:   -> @setState isHover: true
  onMouseLeave:  -> @setState isHover: false

  _getTitle: ->
    return 'ошибка'       if @state.isError
    return 'в процессе..' if @state.isProcess

    if @state.relationship.state is STATE_FRIEND
      if @state.isHover then 'Отписаться' else 'Подписан'
    else
      'Подписаться'