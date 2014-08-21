###* @jsx React.DOM ###

module.experts = window.TlogAlert = React.createClass
  propTypes:
    text:      React.PropTypes.string.isRequired
    fadeSpeed: React.PropTypes.number

  getDefaultProps: ->
    fadeSpeed: 300

  close: ->
    $(@getDOMNode()).fadeOut @props.fadeSpeed, ->
       React.unmountComponentAtNode @getDOMNode()

  render: ->
    `<div className="alert">
      <div className="alert__close" onClick={this.close}><i className="icon icon--cross"></i></div>
      <div className="alert__text" dangerouslySetInnerHTML={{ __html: this.props.text }} />
    </div>`
