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
    if @props.isProcess then i18n.t 'email_submit_process_button' else i18n.t 'email_submit_button'

  handleClick: (e) ->
    e.preventDefault()
    @props.onSubmit()

module.exports = EmailSubmitButton