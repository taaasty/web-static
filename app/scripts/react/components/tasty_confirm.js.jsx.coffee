###* @jsx React.DOM ###

FADE_DURATION = 300

window.TastyConfirm = React.createClass
  mixins: [ReactUnmountMixin]

  propTypes:
    message:           React.PropTypes.string.isRequired
    onAccept:          React.PropTypes.func.isRequired
    acceptButtonText:  React.PropTypes.string
    rejectButtonText:  React.PropTypes.string
    acceptButtonColor: React.PropTypes.string

  getDefaultProps: ->
    acceptButtonText:  'OK'
    rejectButtonText:  'Отмена'
    acceptButtonColor: 'red'

  componentDidMount: ->
    @open()

    $('body').addClass 'no-scroll confirmation-enabled'
    Mousetrap.bind 'esc', @close

  componentWillUnmount: ->
    $('body').removeClass 'no-scroll confirmation-enabled'
    Mousetrap.unbind 'esc', @close

  render: ->
   `<div className="confirmation">
      <div className="confirmation__fader"></div>
      <div className="confirmation__close">
        <div className="icon icon--cross"></div>
      </div>
      <div className="confirmation__box">
        <div dangerouslySetInnerHTML={{ __html: this.props.message }} className="confirmation__text"></div>
        <div className="confirmation__buttons">
          <button onClick={ this.onAccept }
                  className={ "button button--" + this.props.acceptButtonColor + " button--small" }>
            { this.props.acceptButtonText }</button>
          <button onClick={ this.close }
                  className="button button--outline button--small">{ this.props.rejectButtonText }</button>
        </div>
      </div>
    </div>`

  open: -> $(@getDOMNode()).css('display', 'none').fadeIn FADE_DURATION

  close: -> $(@getDOMNode()).fadeOut FADE_DURATION, @unmount

  onAccept: ->
    @close()
    @props.onAccept.call()