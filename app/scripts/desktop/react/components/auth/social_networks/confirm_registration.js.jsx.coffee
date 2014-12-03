###* @jsx React.DOM ###

ConfirmRegistrationMixin = require '../mixins/confirm_registration'

#TODO: i18n
MESSAGE = 'Сейчас будет создан новый аккаунт @#{slug}'

SocialNetworksConfirmRegistration = React.createClass
  mixins: [ConfirmRegistrationMixin, ReactShakeMixin]

  propTypes:
    proposedSlug: React.PropTypes.string.isRequired

  render: ->
    return `<div className="form-popup shellbox-content">
              <div className="form-popup__header">
                <h3 className="form-popup__title">{ this.getMessage() }</h3>
              </div>
              <div className="form-popup__body">
                <form action={ ApiRoutes.confirm_signup_url() }
                      method="post">
                  <button type="submit">
                    Да, зарегистрировать новый аккаунтЕГ
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

  handleDisapproveClick: (e) ->
    e.preventDefault()
    @returnToAuth()

module.exports = SocialNetworksConfirmRegistration