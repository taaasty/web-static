###* @jsx React.DOM ###

window.SettingsEmailShow = React.createClass
  mixins: [ReactShakeMixin]

  propTypes:
    email:             React.PropTypes.any.isRequired
    confirmationEmail: React.PropTypes.any.isRequired
    isConfirmed:       React.PropTypes.bool.isRequired
    onClickEdit:       React.PropTypes.func.isRequired
    onClickCancel:     React.PropTypes.func.isRequired

  render: ->
    if @isConfirmation()
      button = `<button onClick={ this.onClickCancel } className="button button--outline">
                  <span className="button__text">Отменить</span>
                </button>`
      email = @props.confirmationEmail
    else
      button = `<button onClick={ this.onClickEdit } className="button button--outline">
                  <span className="button__text">Изменить</span>
                </button>`
      email = @props.email

    return `<div className="settings__item settings__item--full">
              <div className="settings__right">{ button }</div>
              <div className="settings__left">
                <h3 className="settings__title">Емейл</h3>
                <p className="settings__desc">{ email }</p>
                <SettingsEmailConfirmation email={ this.props.email }
                                           confirmationEmail={ this.props.confirmationEmail }
                                           isConfirmed={ this.props.isConfirmed } />
              </div>
            </div>`

  isConfirmation: -> !!@props.confirmationEmail && @props.confirmationEmail != @props.email

  onClickEdit: (e) ->
    e.preventDefault()

    @props.onClickEdit()

  onClickCancel: (e) ->
    e.preventDefault()

    @props.onClickCancel()