###* @jsx React.DOM ###

window.SettingsName = React.createClass

  propTypes:
    name:         React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    name: @props.name

  render: ->
    `<div className="hero-simple__name">
      <EditableField defaultValue={ this.props.name }
                     onEditEnd={ this.onEditEnd } />
    </div>`

  onEditEnd: (name) ->
    if name isnt @state.name
      @setState name: name
      @props.saveCallback 'slug', name 