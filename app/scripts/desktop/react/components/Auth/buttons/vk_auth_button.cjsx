window.Shellbox_VkAuthButton = React.createClass

  propTypes:
    isActive: React.PropTypes.bool

  getDefaultProps: ->
    isActive: false

  render: ->
    if @props.isActive
      icon = <span className="icon">
               <Spinner size={ 14 } />
             </span>
    else
      icon = <span className="icon icon--vkontakte" />

    return <a href={ ApiRoutes.omniauth_url('vkontakte') }
              onClick={ this.onClick }>
             <button className="button button--vkontakte">
               { icon }
               <span className="button__text">{ this._getTitle() }</span>
             </button>
           </a>

  onClick: (e) ->
    e.preventDefault()

    @props.onClick() if @props.onClick?

  _getTitle: ->
    if @props.isActive then i18n.t 'vkontakte_signin_process_button' else i18n.t 'vkontakte_signup_process_button'