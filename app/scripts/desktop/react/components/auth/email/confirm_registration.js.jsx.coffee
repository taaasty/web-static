###* @jsx React.DOM ###

ConfirmRegistrationMixin = require '../mixins/confirm_registration'

#TODO: i18n
MESSAGE = 'Сейчас будет создан новый аккаунт @#{slug}'

EmailConfirmRegistration = React.createClass
  mixins: [ConfirmRegistrationMixin, RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    email:        React.PropTypes.string.isRequired
    password:     React.PropTypes.string.isRequired
    proposedSlug: React.PropTypes.string.isRequired

  getInitialState: ->
    isProcess: false

  render: ->
    return `<div className="form-popup shellbox-content">
              <div className="form-popup__header">
                <h3 className="form-popup__title">{ this.getMessage() }</h3>
              </div>
              <div className="form-popup__body">
                <form>
                  <button onClick={ this.handleApproveClick }>
                    Да, зарегистрировать новый аккаунт
                  </button>
                  или
                  <a onClick={ this.handleDisapproveClick }>
                    Я уже был зарегистрирован раньше
                  </a>
                </form>
              </div>
            </div>`

  getMessage: ->
    MESSAGE.replace /#{.+}/, @props.proposedSlug

  handleApproveClick: (e) ->
    e.preventDefault()
    @register()

  handleDisapproveClick: (e) ->
    e.preventDefault()
    @returnToEmail()

module.exports = EmailConfirmRegistration