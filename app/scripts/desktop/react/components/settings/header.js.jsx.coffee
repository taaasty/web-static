###* @jsx React.DOM ###

SettingsAvatar = require './avatar'
SettingsSlug   = require './slug'
SettingsTitle  = require './title'

SettingsHeader = React.createClass

  propTypes:
    user:              React.PropTypes.object.isRequired
    activitiesHandler: React.PropTypes.object.isRequired
    onSlugChange:      React.PropTypes.func.isRequired
    onTitleChange:     React.PropTypes.func.isRequired

  getInitialState: ->
    isEditing: false

  render: ->
   `<div className="settings__header">
      <div style={ this._getHeroStyles() }
           className="settings__hero">
        <div className="settings__hero__overlay" />
        <div className="settings__hero__box">
          <div className="settings__hero__avatar">

            <UserAvatar
                user={ this.props.user }
                size={ 110 } />

            <span className="settings__hero__avatar-overlay">
              <span className="form-upload form-upload--icon">
                <span className="form-upload__text">
                  <i className="icon icon--pencil" />
                </span>

                <SettingsAvatar
                    user={ this.props.user }
                    activitiesHandler={ this.props.activitiesHandler } />

              </span>
            </span>
          </div>

          <SettingsSlug
              slug={ this.props.user.slug }
              onChange={ this.props.onSlugChange } />
          <SettingsTitle
              title={ this.props.user.title }
              onChange={ this.props.onTitleChange } />
        </div>
      </div>
    </div>`

  _getHeroStyles: ->
    backgroundUrl = @props.user.design.background_url

    'background-image': "url(#{backgroundUrl})"

module.exports = SettingsHeader