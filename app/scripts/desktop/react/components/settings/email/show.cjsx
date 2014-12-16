SettingsEmailConfirmation = require './confirmation'

SettingsEmailShow = React.createClass
  mixins: [ReactShakeMixin]

  propTypes:
    email:             React.PropTypes.any.isRequired
    confirmationEmail: React.PropTypes.any
    onEditStart:       React.PropTypes.func.isRequired
    onCancel:          React.PropTypes.func.isRequired
    onResend:          React.PropTypes.func.isRequired

  render: ->
    if @isConfirmation()
      email = @props.confirmationEmail
      button = <button className="button button--outline"
                       onClick={ this.handleCancelClick }>
                 <span className="button__text">Отменить</span>
               </button>
      confirmation = <SettingsEmailConfirmation
                         email={ email }
                         confirmationEmail={ this.props.confirmationEmail }
                         onResend={ this.props.onResend } />
    else
      email  = @props.email
      button = <button className="button button--outline"
                       onClick={ this.handleEditClick }>
                 <span className="button__text">Изменить</span>
               </button>

    return <div className="settings__item settings__item--full">
             <div className="settings__right">{ button }</div>
             <div className="settings__left">
               <h3 className="settings__title">Емейл</h3>
               <p className="settings__desc">{ email }</p>
               { confirmation }
             </div>
           </div>

  isConfirmation: ->
    @props.confirmationEmail? && @props.confirmationEmail isnt @props.email

  handleEditClick: (e) ->
    e.preventDefault()
    @props.onEditStart()

  handleCancelClick: (e) ->
    e.preventDefault()
    @props.onCancel()

module.exports = SettingsEmailShow