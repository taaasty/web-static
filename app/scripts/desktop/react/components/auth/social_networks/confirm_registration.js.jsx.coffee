###* @jsx React.DOM ###

ConfirmRegistrationMixin = require '../mixins/confirm_registration'

#TODO: i18n
MESSAGE = 'Сейчас будет создан новый аккаунт @#{slug}'

SocialNetworksConfirmRegistration = React.createClass
  mixins: [ConfirmRegistrationMixin, ReactShakeMixin]

  propTypes:
    postUrl:      React.PropTypes.string.isRequired
    proposedSlug: React.PropTypes.string.isRequired

  render: ->
    return `<div className="form-popup form-popup--confirm">
              <div className="form-popup__body">
                <form action={ this.props.postUrl }
                      method="post">
                  <div className="form-popup__lead">{ this.getMessage() }</div>
                  <div className="form-popup__submit">
                    <button className="button button--large button--green-light button--block button--rectangle"
                            onClick={ this.handleApproveClick }>
                      Да, зарегистрировать новый аккаунт
                    </button>
                  </div>
                </form>
              </div>
              <div className="form-popup__footer">
                <span className="form-popup__footer-or">или</span>
                <a className="form-popup__footer-item"
                   onClick={ this.handleDisapproveClick }>
                  Я уже был зарегистрирован раньше
                </a>
              </div>
            </div>`

  getMessage: ->
    MESSAGE.replace /#{.+}/, @props.proposedSlug

  handleDisapproveClick: (e) ->
    e.preventDefault()
    @returnToAuth()

module.exports = SocialNetworksConfirmRegistration