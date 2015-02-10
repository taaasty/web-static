{ PropTypes } = React

SettingsHeroSlug = React.createClass
  displayName: 'SettingsHeroSlug'

  propTypes:
    slug: PropTypes.string.isRequired

  render: ->
    <div className="settings__hero__name">
      <textarea
          defaultValue={ @props.slug }
          placeholder="Ваш псевдоним"
          maxLength={ 140 }
          className="settings__hero__textarea" />
    </div>

module.exports = SettingsHeroSlug