ConfirmRegistrationMixin = require '../mixins/confirm_registration'

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
               <div className="form-popup__lead">
                 { i18n.t('confirm_signup', {userSlug: @props.proposedSlug}) }
               </div>
               <div className="form-popup__submit">
                 <button className="button button--large button--green-light button--block button--rectangle"
                         onClick={ this.handleApproveClick }>
                   { i18n.t('confirm_signup_approve') }
                 </button>
               </div>
             </div>
             <div className="form-popup__footer">
               <span className="form-popup__footer-or">{ i18n.t('or') }</span>
               <a className="form-popup__footer-item"
                  onClick={ this.handleDisapproveClick }>
                 { i18n.t('already_registered_link') }
               </a>
             </div>
           </div>

  handleApproveClick: (e) ->
    e.preventDefault()
    @register()

  handleDisapproveClick: (e) ->
    e.preventDefault()
    @returnToEmail()

module.exports = EmailConfirmRegistration