window.RecoveryShellbox = React.createClass
  mixins: [ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin]

  getInitialState: ->
    inProcess: false

  gotoSelectSignin: ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.shellbox.show Auth

  submit: (event)->
    event.preventDefault()

    return if @state.inProcess

    slug = @refs.slug.getDOMNode().value

    if slug.length < 1
      @shake()
      TastyNotifyController.notifyError i18n.t 'empty_login_error'
      return

    @setState inProcess: true

    @createRequest
      url: ApiRoutes.recovery_url()
      data: slug_or_email: slug
      method: 'POST'
      success: (data) =>
        TastyNotifyController.notifySuccess i18n.t('recovery_mail_sent'), 10000
        ReactApp.shellbox.close()
      error: (data) =>
        @shake()
        @refs.slug.getDOMNode().focus()
        TastyNotifyController.errorResponse data
      complete: => @safeUpdateState inProcess: false

  render: ->
    if @state.inProcess
      button_title = i18n.t 'reset_password_process_button'
    else
      footer = @renderFooter()
      button_title = i18n.t 'reset_password_button'

    return <div className='form-popup shellbox-content'>
             <div className='form-popup__header'>
               <h3 className='form-popup__title'>
                 { i18n.t('email_recovery_header') }
               </h3>
             </div>
             <div className='form-popup__body'>
               <form onSubmit={this.submit}>
                 <div className='form-popup__item'>
                   <div className='form-field form-field--simple'>
                     <input ref='slug'
                            autoFocus={true}
                            disabled={this.state.inProcess}
                            className='form-field__input'
                            placeholder={ i18n.t('login_field_placeholder') }
                            type='text' />
                      <div className='form-field__bg' /></div> 
                   </div> 
                 <div className='form-popup__submit'>
                   <button disabled={ this.state.inProcess }
                           className="button button--large button--green-light button--block button--rectangle">
                     <span className='button__text'>
                       { button_title }
                     </span>
                   </button> 
                 </div>
               </form>
               </div>
             { footer }
           </div>

  renderFooter: ->
    <div className='form-popup__footer'>
      <a className='form-popup__footer-item' title={ i18n.t('remembered_password_link') } onClick={this.gotoSelectSignin}>
        { i18n.t('remembered_password_link') }
      </a>
    </div>