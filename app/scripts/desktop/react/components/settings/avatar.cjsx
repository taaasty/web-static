CurrentUserServerActions = require '../../actions/server/current_user'

SettingsAvatar = React.createClass
  mixins: ['ReactActivitiesUser']

  propTypes:
    user: React.PropTypes.object.isRequired

  componentDidMount: ->
    $(@getDOMNode()).fileupload
      url: ApiRoutes.userpic_url()
      replaceFileInput: false
      start: => @incrementActivities()
      fail: (e, data) =>
        TastyNotifyController.errorResponse data
      done: (e, data) =>
        userpic = data.response().jqXHR.responseJSON

        CurrentUserServerActions.updateUserpic userpic
      always: => @decrementActivities()

  componentWillUnmount: ->
    $(@getDOMNode()).fileupload 'destroy'

  render: ->
    <input className="form-upload__input" type="file" accept="image/*" name="file" />

module.exports = SettingsAvatar