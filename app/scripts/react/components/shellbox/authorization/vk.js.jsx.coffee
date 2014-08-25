###* @jsx React.DOM ###

AUTH_TIMEOUT = 30000

window.VkAuthorizationShellBox = React.createClass

  propTypes:
    disableShellbox: React.PropTypes.func.isRequired
    enableShellbox:  React.PropTypes.func.isRequired

  getInitialState: ->
    isActive: true

  componentDidMount: ->
    @props.disableShellbox()

    @timeout = setTimeout @_cancelAuth, AUTH_TIMEOUT
    _.defer -> window.location = Routes.api.omniauth_url 'vkontakte'

  componentWillUnmount: -> clearTimeout @timeout if @timeout?

  render: ->
   `<AuthorizationShellBox>
      <Shellbox_VkAuthButton isActive={ this.state.isActive } />
    </AuthorizationShellBox>`

  _cancelAuth: ->
    @props.enableShellbox()

    window.stop()
    ReactApp.shellbox.show InviterShellBox