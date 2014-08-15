###* @jsx React.DOM ###

STATE_IGNORED = 'ignored'

window.RelationshipIgnoreButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired

  getInitialState: ->
    relationship: @props.relationship
    isHover:      false
    isError:      false
    isProcess:    false

  render: ->
   `<button className="follow-button"
            onClick={ this.onClick }
            onMouseOver={ this.onMouseOver }
            onMouseLeave={ this.onMouseLeave }>
      { this._getTitle() }
    </button>`

  isIgnored: -> @state.relationship.state == STATE_IGNORED

  onClick: -> if @isIgnored() then @cancel() else @ignore()

  onMouseOver:  -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false

  _getTitle: ->
    return 'ошибка'       if @state.isError
    return 'в процессе..' if @state.isProcess

    if @state.relationship.state is STATE_IGNORED
      if @state.isHover then 'Разблокировать' else 'Заблокирован'
    else
      'Заблокировать'