_ = require 'lodash'
{ PropTypes } = React

SettingsHeroTitle = React.createClass
  displayName: 'SettingsHeroTitle'

  propTypes:
    title: PropTypes.string.isRequired

  render: ->
    <div className="settings__hero__text">
      <textarea
          placeholder={ i18n.t('placeholders.settings_title') }
          maxLength={ 140 }
          className="settings__hero__textarea"
          onBlur={ @handleBlur } />
    </div>

  handleBlur: (e) ->
    value = _.trim e.target.value
    @props.onChange value

module.exports = SettingsHeroTitle