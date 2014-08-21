###* @jsx React.DOM ###

module.experts = window.SettingsAvatar = React.createClass
  mixins: [ReactShakeMixin, 'ReactActivitiesUser']

  propTypes:
    user: React.PropTypes.object.isRequired

  componentDidMount: ->
    $(@getDOMNode()).fileupload
      url: Routes.api.userpic_url()
      replaceFileInput: false
      dataType: 'json'
      start: =>
        @incrementActivities()
        true
      fail: (e,data) =>
        @shake()
        TastyNotifyController.errorResponse data
      done: (e,data) =>
        @props.user.set 'userpic', data.response().jqXHR.responseJSON
        TastyEvents.trigger TastyEvents.keys.user_property_changed( 'avatar', @props.user.id ), [data.response().jqXHR.responseJSON]
      always: => @decrementActivities()
      progressall: (e, data) ->
        progress = parseInt(data.loaded / data.total * 100, 10)

        console.log "upload progress", progress

  componentWillUnmount: ->
    $(@getDOMNode()).fileupload 'destroy'

  render: ->
    `<input className="form-upload__input" type="file" accept="image/*" name="file" />`