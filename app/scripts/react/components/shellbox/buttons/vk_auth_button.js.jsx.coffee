###* @jsx React.DOM ###

window.Shellbox_VkAuthButton = React.createClass

  propTypes:
    isActive: React.PropTypes.bool

  getDefaultProps: ->
    isActive: false

  render: ->
    if @props.isActive
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

    @props.onClick() if @props.onClick?

  _getTitle: ->
    if @props.isActive then 'Авторизуюсь..' else 'Зарегистрироваться'