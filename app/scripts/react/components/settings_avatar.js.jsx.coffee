###* @jsx React.DOM ###

module.experts = window.SettingsAvatar = React.createClass
  mixins: [ReactShakeMixin]
  propTypes:
    user:         React.PropTypes.object.isRequired
    #saveCallback: React.PropTypes.func.isRequired
  componentDidMount: ->
    $(@getDOMNode()).fileupload 
      url: Routes.api.userpic_url()
      dataType: 'json'
      fail: (e,data)->
        debugger
        TastyUtils.notifyErrorResponse data
      always: ->
        @shake()

      progressall: (e, data) ->
        progress = parseInt(data.loaded / data.total * 100, 10)

        console.log progress


  componentWillUnmount: ->
    $(@getDOMNode()).fileupload 'destroy'

  render: ->
    `<input className="form-upload__input" type="file" accept="image/*" name="file" />`

