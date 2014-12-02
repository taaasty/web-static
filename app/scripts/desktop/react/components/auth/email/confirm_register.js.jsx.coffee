###* @jsx React.DOM ###

ConfirmRegisterMixin = require './mixins/confirm_register'

#TODO: i18n
MESSAGE = 'Сейчас будет создан новый аккаунт @#{slug}'

EmailConfirmRegister = React.createClass
  mixins: [ConfirmRegisterMixin, RequesterMixin, ComponentManipulationsMixin]

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

module.exports = EmailConfirmRegister