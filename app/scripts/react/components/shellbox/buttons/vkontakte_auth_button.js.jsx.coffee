###* @jsx React.DOM ###

window.Shellbox_VkontakteAuthButton = React.createClass

  propTypes:
    onProcess: React.PropTypes.func

  getInitialState: ->
    isProcess: false

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

    @props.onProcess() if @props.onProcess?

    _.defer -> window.location = Routes.api.omniauth_url 'vkontakte'

  _getTitle: ->
    if @state.isProcess then 'Авторизовываюсь..' else 'Зарегистрироваться'