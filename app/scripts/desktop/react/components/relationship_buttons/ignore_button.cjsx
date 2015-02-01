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
    # Inline-block need to prevent AdBlock social buttons hiding
    <button style={{ display: 'inline-block!important' }}
            className="follow-button"
            onClick={ this.onClick }
            onMouseOver={ this.onMouseOver }
            onMouseLeave={ this.onMouseLeave }>
      { this._getTitle() }
    </button>

  isIgnored: -> @state.relationship.state == STATE_IGNORED

  onClick: -> if @isIgnored() then @cancel() else @ignore()

  onMouseOver:  -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false

  _getTitle: ->
    return i18n.t 'follow_button_error'   if @state.isError
    return i18n.t 'follow_button_process' if @state.isProcess

    if @state.relationship.state is STATE_IGNORED
      if @state.isHover then i18n.t 'follow_button_unblock' else i18n.t 'follow_button_ignored'
    else
      i18n.t 'follow_button_block'