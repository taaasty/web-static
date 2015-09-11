_                = require 'lodash'
NotifyController = require '../../../controllers/notify'
{ PropTypes } = React

SettingsHeroSlug = React.createClass
  displayName: 'SettingsHeroSlug'

  propTypes:
    slug:     PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  getInitialState: ->
    { value: @props.slug }

  render: ->
    <div className="settings__hero__name">
      <input
        className="settings__hero__textarea"
        maxLength={ 20 }
        onBlur={ @onBlur }
        onChange={ @onChange }
        onKeyDown={ @onKeyDown }
        placeholder={ i18n.t('placeholders.settings_slug') }
        value={ @state.value }
      />
    </div>

  onBlur: (ev) ->
    @setState({ value: @props.slug })

  onChange: (ev) ->
    @setState({ value: ev.target.value })

  onKeyDown: (ev) ->
    if ev.key == 'Enter'
      @commitChanges(_.trim(ev.target.value))
      ev.target.blur()
      @onChange(ev) # to set value after blur
      ev.preventDefault()

  commitChanges: (value) ->
    if value.length
      @props.onChange value
    else
      NotifyController.notifyError i18n.t('messages.settings_empty_slug_error')

module.exports = SettingsHeroSlug
