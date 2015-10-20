SettingsAvatar = require './avatar'
SettingsSlug   = require './SettingsSlug'
SettingsTitle  = require './title'

SettingsHeader = React.createClass
  displayName: 'SettingsHeader'

  propTypes:
    user:              React.PropTypes.object.isRequired
    activitiesHandler: React.PropTypes.object.isRequired
    onSlugChange:      React.PropTypes.func.isRequired
    onTitleChange:     React.PropTypes.func.isRequired

  getInitialState: ->
    isEditing: false

  render: ->
    <div className="settings__header">
      <div style={ @_getHeroStyles() }
           className="settings__hero">
        <div className="settings__hero__overlay" />
        <div className="settings__hero__box">
          <SettingsAvatar
              user={ @props.user }
              activitiesHandler={ @props.activitiesHandler } />
          <SettingsSlug
              slug={ @props.user.slug }
              onChange={ @props.onSlugChange } />
          <SettingsTitle
              title={ @props.user.title }
              onChange={ @props.onTitleChange } />
        </div>
      </div>
    </div>

  _getHeroStyles: ->
    backgroundUrl = @props.user.design.backgroundImageUrl

    backgroundImage: "url(#{backgroundUrl})"

module.exports = SettingsHeader