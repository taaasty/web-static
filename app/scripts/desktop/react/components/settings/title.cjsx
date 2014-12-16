SettingsTitle = React.createClass

  propTypes:
    title:    React.PropTypes.string
    onChange: React.PropTypes.func.isRequired

  getDefaultProps: ->
    title: ''

  getInitialState: ->
    title: @props.title

  render: ->
    <div className="settings__hero__text">
      <EditableField
          defaultValue={ this.state.title }
          placeholder="Введите небольшое описание вашего тлога"
          onEditEnd={ this.onEditEnd } />
    </div>

  onEditEnd: (title) ->
    if title isnt @props.title
      @setState(title: title)
      @props.onChange title

module.exports = SettingsTitle