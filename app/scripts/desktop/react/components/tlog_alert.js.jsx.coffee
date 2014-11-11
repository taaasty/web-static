###* @jsx React.DOM ###

FADE_SPEED = 300
module.experts = window.TlogAlert = React.createClass
  propTypes:
    text:        React.PropTypes.string
    canClose:    React.PropTypes.bool

  getDefaultProps: ->
    canClose: false

  close: ->
    $(@getDOMNode()).fadeOut FADE_SPEED, ->
       React.unmountComponentAtNode @getDOMNode()

  render: ->
    if @props.text? && @props.text.length>0
      if @props.canClose
        closeElement = `<div className="alert__close" onClick={this.close}><i className="icon icon--cross"></i></div>`
      `<div className="alert">
        <div className="alert__text" dangerouslySetInnerHTML={{ __html: this.props.text }} />
        { closeElement }
      </div>`
    else
      null
