_                = require 'lodash'
NotifyController = require '../../../controllers/notify'
{ PropTypes } = React

SettingsHeroSlug = React.createClass
  displayName: 'SettingsHeroSlug'

  propTypes:
    slug:     PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  render: ->
    <div className="settings__hero__name">
      <textarea
          defaultValue={ @props.slug }
          placeholder={ i18n.t('placeholders.settings_slug') }
          maxLength={ 140 }
          className="settings__hero__textarea"
          onBlur={ @handleBlur } />
    </div>

  handleBlur: (e) ->
    value = _.trim e.target.value

    if value.length
      @props.onChange value
    else
      NotifyController.notifyError i18n.t('messages.settings_empty_slug_error')

module.exports = SettingsHeroSlug