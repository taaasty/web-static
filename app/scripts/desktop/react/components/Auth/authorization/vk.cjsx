AUTH_TIMEOUT = 30000

window.VkAuthorizationShellbox = React.createClass

  propTypes:
    disableShellbox: React.PropTypes.func.isRequired
    enableShellbox:  React.PropTypes.func.isRequired

  getInitialState: ->
    isActive: true

  componentDidMount: ->
    @props.disableShellbox()

    @timeout = setTimeout @_cancelAuth, AUTH_TIMEOUT
    _.defer -> window.location = ApiRoutes.omniauth_url 'vkontakte'

  componentWillUnmount: -> clearTimeout @timeout if @timeout?

  render: ->
    <AuthorizationShellbox>
      <Shellbox_VkAuthButton isActive={ this.state.isActive } />
    </AuthorizationShellbox>

  _cancelAuth: ->
    @props.enableShellbox()

    window.stop()
    ReactApp.shellbox.show AuthShellbox