###* @jsx React.DOM ###

AUTH_TIMEOUT = 30000

window.Shellbox_VkontakteAuthButton = React.createClass

  propTypes:
    onProcessStart: React.PropTypes.func
    onProcessEnd:   React.PropTypes.func

  getInitialState: ->
    isProcess: false

  componentWillUnmount: -> clearTimeout @timeout if @timeout?

  render: ->
    if @state.isProcess
      icon = `<span className="icon">
                <Spinner size={ 15 } />
              </span>`
    else
      icon = `<span className="icon icon--vkontakte" />`

    return `<a href={ Routes.api.omniauth_url('vkontakte') }
               onClick={ this.onClick }>
              <button className="button button--vkontakte">
                { icon }
                <span className="button__text">{ this._getTitle() }</span>
              </button>
            </a>`

  onClick: (e) ->
    e.preventDefault()

    @setState isProcess: true
    @props.onProcessStart() if @props.onProcessStart?

    @timeout = setTimeout @_cancelAuth, AUTH_TIMEOUT
    _.defer -> window.location = Routes.api.omniauth_url 'vkontakte'

  _getTitle: ->
    if @state.isProcess then 'Авторизовываюсь..' else 'Зарегистрироваться'

  _cancelAuth: ->
    window.stop()
    @setState isProcess: false
    @props.onProcessEnd() if @props.onProcessEnd?