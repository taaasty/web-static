UserAvatar = require '../../common/avatar/user'
{ PropTypes } = React

SettingsHeroAvatar = React.createClass
  displayName: 'SettingsHeroAvatar'

  propTypes:
    user: PropTypes.object.isRequired

  render: ->
    <div className="settings__hero__avatar">
      <UserAvatar
          user={ @props.user }
          size={ 220 } />
      <span className="settings__hero__avatar-overlay">
        <span className="form-choose-file">
          <span className="form-choose-file__text">
            <i className="icon icon--pencil" />
          </span>
          <input className="form-choose-file__input" type="file" accept="image/*" name="file" />
        </span>
      </span>
    </div>

module.exports = SettingsHeroAvatar