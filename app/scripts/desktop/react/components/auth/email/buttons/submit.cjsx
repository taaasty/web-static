#TODO: i18n
ENTER_TITLE    = 'Войти'
ENTERING_TITLE = 'Вхожу..'

EmailSubmitButton = React.createClass

  propTypes:
    isProcess:  React.PropTypes.bool
    isDisabled: React.PropTypes.bool
    onSubmit:   React.PropTypes.func.isRequired

  render: ->
    <div className="form-popup__submit">
      <button disabled={ this.props.isDisabled }
              className="button button--large button--green-light button--block button--rectangle"
              onClick={ this.handleClick }>
        <span className="button__text">
          { this.getTitle() }
        </span>
      </button>
    </div>

  getTitle: ->
    if @props.isProcess then ENTERING_TITLE else ENTER_TITLE

  handleClick: (e) ->
    e.preventDefault()
    @props.onSubmit()

module.exports = EmailSubmitButton