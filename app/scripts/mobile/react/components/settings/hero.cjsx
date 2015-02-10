SettingsHeroAvatar = require './hero/avatar'
SettingsHeroSlug   = require './hero/slug'
SettingsHeroTitle  = require './hero/title'
{ PropTypes } = React

SettingsHero = React.createClass
  displayName: 'SettingsHero'

  propTypes:
    user: PropTypes.object.isRequired

  render: ->
    <div className="settings__hero"
         style={ @getHeroStyles() }>
      <div className="settings__hero__overlay" />
      <div className="settings__hero__box">
        <SettingsHeroAvatar user={ @props.user } />
        <SettingsHeroSlug slug={ @props.user.slug } />
        <SettingsHeroTitle title={ @props.user.title }  />
      </div>
    </div>

  getHeroStyles: ->
    #TODO: Get optimized background through ThumborService
    backgroundUrl = @props.user.design?.background_url

    backgroundImage: "url('#{ backgroundUrl }')"

module.exports = SettingsHero