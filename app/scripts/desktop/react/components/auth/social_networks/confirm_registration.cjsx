ConfirmRegistrationMixin = require '../mixins/confirm_registration'

SocialNetworksConfirmRegistration = React.createClass
  mixins: [ConfirmRegistrationMixin, ReactShakeMixin]

  propTypes:
    postUrl:      React.PropTypes.string.isRequired
    proposedSlug: React.PropTypes.string.isRequired

  render: ->
    return <div className="form-popup form-popup--confirm">
             <div className="form-popup__body">
               <form action={ this.props.postUrl }
                     method="post">
                 <div className="form-popup__lead">
                   { i18n.t('confirm_signup', {userSlug: @props.proposedSlug}) }
                 </div>
                 <div className="form-popup__submit">
                   <button className="button button--large button--green-light button--block button--rectangle"
                           onClick={ this.handleApproveClick }>
                     { i18n.t('confirm_signup_approve') }
                   </button>
                 </div>
               </form>
             </div>
             <div className="form-popup__footer">
               <span className="form-popup__footer-or">или</span>
               <a className="form-popup__footer-item"
                  onClick={ this.handleDisapproveClick }>
                 { i18n.t('already_registered_link') }
               </a>
             </div>
           </div>

  handleDisapproveClick: (e) ->
    e.preventDefault()
    @returnToAuth()

module.exports = SocialNetworksConfirmRegistration