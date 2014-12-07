###* @jsx React.DOM ###

SettingsEmailConfirmation = require './confirmation'

SettingsEmailShow = React.createClass
  mixins: [ReactShakeMixin]

  propTypes:
    email:             React.PropTypes.any.isRequired
    confirmationEmail: React.PropTypes.any
    confirmed:         React.PropTypes.bool.isRequired
    onClickEdit:       React.PropTypes.func.isRequired
    onClickCancel:     React.PropTypes.func.isRequired

  render: ->
    if @isConfirmation()
      email  = @props.confirmationEmail
      button = `<button className="button button--outline"
                        onClick={ this.onClickCancel }>
                  <span className="button__text">Отменить</span>
                </button>`
    else
      email  = @props.email
      button = `<button className="button button--outline"
                        onClick={ this.onClickEdit }>
                  <span className="button__text">Изменить</span>
                </button>`

    return `<div className="settings__item settings__item--full">
              <div className="settings__right">
                { button }
              </div>
              <div className="settings__left">
                <h3 className="settings__title">Емейл</h3>
                <p className="settings__desc">
                  { email }
                </p>
                <SettingsEmailConfirmation email={ email }
                                           confirmationEmail={ this.props.confirmationEmail }
                                           confirmed={ this.props.confirmed } />
              </div>
            </div>`

  isConfirmation: ->
    !!@props.confirmationEmail && @props.confirmationEmail != @props.email

  onClickEdit: (e) ->
    e.preventDefault()

    @props.onClickEdit()

  onClickCancel: (e) ->
    e.preventDefault()

    @props.onClickCancel()

module.exports = SettingsEmailShow