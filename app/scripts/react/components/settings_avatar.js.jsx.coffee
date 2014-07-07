###* @jsx React.DOM ###

module.experts = window.SettingsAvatar = React.createClass
  mixins: [ReactShakeMixin]
  propTypes:
    user:         React.PropTypes.object.isRequired
    spinnerLink:  React.PropTypes.object.isRequired

  componentDidMount: ->
    $(@getDOMNode()).fileupload
      url: Routes.api.userpic_url()
      replaceFileInput: false
      dataType: 'json'
      start: =>
        @props.spinnerLink.requestChange @props.spinnerLink.value+1
        true
      fail: (e,data) =>
        @shake()
        TastyNotifyController.errorResponse data
      done: (e,data)=>
        @props.user.set 'userpic', data.response().jqXHR.responseJSON

      always: =>
        @props.spinnerLink.requestChange @props.spinnerLink.value-1

      progressall: (e, data) ->
        progress = parseInt(data.loaded / data.total * 100, 10)

        console.log "upload progress", progress


  componentWillUnmount: ->
    $(@getDOMNode()).fileupload 'destroy'

  render: ->
    `<input className="form-upload__input" type="file" accept="image/*" name="file" />`

