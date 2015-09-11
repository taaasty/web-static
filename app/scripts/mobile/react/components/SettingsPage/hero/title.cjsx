_ = require 'lodash'
{ PropTypes } = React

SettingsHeroTitle = React.createClass
  displayName: 'SettingsHeroTitle'

  propTypes:
    title: PropTypes.string.isRequired

  getInitialState: ->
    { value: @props.title }

  render: ->
    <div className="settings__hero__text">
      <textarea
        placeholder={ i18n.t('placeholders.settings_title') }
        maxLength={ 140 }
        className="settings__hero__textarea"
        onBlur={ @onBlur }
        onChange={ @onChange }
        onKeyDown={ @onKeyDown }
        value={ @state.value }
      />
    </div>

  onBlur: (ev) ->
    @setState({ value: @props.title })

  onChange: (ev) ->
    @setState({ value: ev.target.value })

  onKeyDown: (ev) ->
    if ev.key == 'Enter'
      @props.onChange(_.trim(ev.target.value))
      ev.target.blur()
      @onChange(ev)
      ev.preventDefault()

module.exports = SettingsHeroTitle