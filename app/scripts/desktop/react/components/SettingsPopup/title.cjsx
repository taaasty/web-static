SettingsTitle = React.createClass
  displayName: 'SettingsTitle'

  propTypes:
    title:    React.PropTypes.string
    onChange: React.PropTypes.func.isRequired

  getInitialState: ->
    title: @props.title || ''

  render: ->
    <div className="settings__hero__text">
      <EditableField
          defaultValue={ @state.title }
          placeholder={ i18n.t('settings_description_placeholder') }
          onEditEnd={ @handleEditEnd } />
    </div>

  handleEditEnd: (title) ->
    if title isnt @props.title
      @setState(title: title)
      @props.onChange title
    else
      @forceUpdate()

module.exports = SettingsTitle