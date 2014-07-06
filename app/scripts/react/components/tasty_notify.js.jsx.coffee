###* @jsx React.DOM ###

module.exports = window.TastyNotify = React.createClass
  mixins: [ReactUnmountMixin]

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
    $(document).on this.props.hideEvent, @close

  componentDidMount: ->
    $node = $( @getDOMNode() )
    $node.css marginLeft: -($node.width() / 2)
    @timeout = setTimeout @close, @props.timeout

  componentWillUnmount: ->
    $(document).off this.props.hideEvent, @close
    clearTimeout @timeout if @timeout

  close: -> $(@getDOMNode()).fadeOut 'fast', @unmount

  render: ->
   `<div className={"notice notice--" + this.props.type} onClick={this.hide}>
      <div className="notice__inner">{this.props.text}</div>
    </div>`
