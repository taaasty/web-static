_                = require 'lodash'
NotifyController = require '../../../controllers/notify'
{ findDOMNode, PropTypes } = React

SettingsHeroSlug = React.createClass
  displayName: 'SettingsHeroSlug'

  propTypes:
    slug:     PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  render: ->
    <div className="settings__hero__name">
      <input
        ref="slugInput"
        defaultValue={ @props.slug }
        placeholder={ i18n.t('placeholders.settings_slug') }
        maxLength={ 20 }
        className="settings__hero__textarea"
        onBlur={ @handleBlur }
        onKeyDown={ @onKeyDown }
      />
    </div>

  handleBlur: (e) ->
    value = _.trim e.target.value

    if value.length
      @props.onChange value
    else
      NotifyController.notifyError i18n.t('messages.settings_empty_slug_error')

  onKeyDown: (ev) ->
    if ev.key == 'Enter'
      ev.preventDefault()
      input = findDOMNode(@refs.slugInput)
      input.blur()

module.exports = SettingsHeroSlug
