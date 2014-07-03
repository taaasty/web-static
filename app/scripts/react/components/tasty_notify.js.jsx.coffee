###* @jsx React.DOM ###

module.exports = window.TastyNotify = React.createClass

  statics:
    TYPE:       'success'
    TIMEOUT:    3000
    HIDE_EVENT: 'notifications:hide'

  propTypes:
    type:    React.PropTypes.string
    text:    React.PropTypes.string.isRequired
    timeout: React.PropTypes.number

  getDefaultProps: ->
    type:      @constructor.TYPE
    timeout:   @constructor.TIMEOUT
    hideEvent: @constructor.HIDE_EVENT

  componentWillMount: ->
    $(document).on this.props.hideEvent, @unmount

  componentDidMount: ->
    $node = $( @getDOMNode() )
    $node.css marginLeft: -($node.width() / 2)
    @timeout = setTimeout @unmount, @props.timeout

  componentWillUnmount: ->
    $(document).off this.props.hideEvent, @unmount
    clearTimeout @timeout if @timeout

  unmount: ->
    node = @getDOMNode()
    parentNode = @getDOMNode().parentNode
    $(node).fadeOut 'fast', ->
      React.unmountComponentAtNode parentNode
      parentNode.remove()

  render: ->
   `<div className={"notice notice--" + this.props.type} onClick={this.hide}>
      <div className="notice__inner">{this.props.text}</div>
    </div>`