###* @jsx React.DOM ###

DEFAULT_TYPE    = 'success'
DEFAULT_TIMEOUT = 3000

window.TastyNotify = React.createClass
  mixins: [ReactUnmountMixin]

  propTypes:
    text:    React.PropTypes.string.isRequired
    type:    React.PropTypes.string
    timeout: React.PropTypes.number
    onClose: React.PropTypes.func.isRequired

  getDefaultProps: ->
    type:    DEFAULT_TYPE
    timeout: DEFAULT_TIMEOUT

  componentDidMount: ->
    $node = $( @getDOMNode() )
    $node.css marginLeft: -($node.width() / 2)
    @timeout = setTimeout @close, @props.timeout

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

    @props.onClose @

  close: -> $(@getDOMNode()).fadeOut 'fast', @unmount

  render: ->
   `<div className={ "notice notice--" + this.props.type }
         onClick={ this.close }>
      <div className="notice__inner">{ this.props.text }</div>
    </div>`