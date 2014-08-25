###* @jsx React.DOM ###

window.SettingsEmailShow = React.createClass
  mixins: [ReactShakeMixin]

  propTypes:
    email:             React.PropTypes.string.isRequired
    confirmationEmail: React.PropTypes.any.isRequired
    isConfirmed:       React.PropTypes.bool.isRequired
    onClickEdit:       React.PropTypes.func.isRequired

  render: ->
   `<div className="settings__item settings__item--full">
      <div className="settings__right">
        <button onClick={ this.onClickEdit } className="button button--outline">
          <span className="button__text">Изменить</span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">Емейл</h3>
        <p className="settings__desc">{ this.props.email }</p>
        <SettingsEmailConfirmation email={ this.props.email }
                                   confirmationEmail={ this.props.confirmationEmail }
                                   isConfirmed={ this.props.isConfirmed } />
      </div>
    </div>`

  onClickEdit: (e) ->
    e.preventDefault()

    @props.onClickEdit()