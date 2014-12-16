ConfirmRegistrationMixin = require '../mixins/confirm_registration'

#TODO: i18n
MESSAGE = 'Сейчас будет создан новый аккаунт @#{slug}'

EmailConfirmRegistration = React.createClass
  mixins: [ConfirmRegistrationMixin, RequesterMixin, ReactShakeMixin, ComponentManipulationsMixin]

  propTypes:
    email:        React.PropTypes.string.isRequired
    password:     React.PropTypes.string.isRequired
    proposedSlug: React.PropTypes.string.isRequired

  getInitialState: ->
    isProcess: false

  render: ->
    return <div className="form-popup form-popup--confirm">
             <div className="form-popup__body">
               <div className="form-popup__lead">{ this.getMessage() }</div>
               <div className="form-popup__submit">
                 <button className="button button--large button--green-light button--block button--rectangle"
                         onClick={ this.handleApproveClick }>
                   Да, зарегистрировать новый аккаунт
                 </button>
               </div>
             </div>
             <div className="form-popup__footer">
               <span className="form-popup__footer-or">или</span>
               <a className="form-popup__footer-item"
                  onClick={ this.handleDisapproveClick }>
                 Я уже был зарегистрирован раньше
               </a>
             </div>
           </div>

  getMessage: ->
    MESSAGE.replace /#{.+}/, @props.proposedSlug

  handleApproveClick: (e) ->
    e.preventDefault()
    @register()

  handleDisapproveClick: (e) ->
    e.preventDefault()
    @returnToEmail()

module.exports = EmailConfirmRegistration