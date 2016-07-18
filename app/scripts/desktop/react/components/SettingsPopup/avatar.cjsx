UserAvatar = require '../UserAvatar';
CurrentUserServerActions = require '../../actions/server/current_user'
{ PropTypes } = React

SettingsAvatar = React.createClass
  propTypes:
    user:              PropTypes.object.isRequired
#    activitiesHandler: PropTypes.object.isRequired

  componentDidMount: ->
    $(this.refs.avatarInput).fileupload
      url: ApiRoutes.userpic_url()
      replaceFileInput: false
      fail: (e, data) =>
        NoticeService.errorResponse data
      done: (e, data) =>
        userpic = data.response().jqXHR.responseJSON

        CurrentUserServerActions.updateUserpic userpic

  componentWillUnmount: ->
    $(this.refs.avatarInput).fileupload 'destroy'

  render: ->
    <div className="settings__hero__avatar">
      <UserAvatar
          user={ @props.user }
          size={ 110 } />
      <span className="settings__hero__avatar-overlay">
        <input ref="avatarInput"
               type="file"
               name="file"
               accept="image/*"
               className="form-upload__input" />
        <span className="form-upload form-upload--icon">
          <span className="form-upload__text">
            <i className="icon icon--pencil" />
          </span>
        </span>
      </span>
    </div>

module.exports = SettingsAvatar