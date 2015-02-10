{ PropTypes } = React

SettingsHeroTitle = React.createClass
  displayName: 'SettingsHeroTitle'

  propTypes:
    title: PropTypes.string.isRequired

  render: ->
    <div className="settings__hero__text">
      <textarea
          placeholder="Небольшое описание тлога"
          maxLength={ 140 }
          className="settings__hero__textarea" />
    </div>

module.exports = SettingsHeroTitle