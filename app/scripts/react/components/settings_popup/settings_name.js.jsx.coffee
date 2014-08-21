###* @jsx React.DOM ###

window.SettingsName = React.createClass

  propTypes:
    name:         React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    name: @props.name

  render: ->
    `<div className="settings__hero__name">
      <EditableField defaultValue={ this.state.name }
                     placeholder="Введите ваш псевдоним"
                     onEditEnd={ this.onEditEnd } />
    </div>`

  onEditEnd: (name) ->
    if name isnt @state.name
      @setState name: name
      @props.saveCallback 'slug', name