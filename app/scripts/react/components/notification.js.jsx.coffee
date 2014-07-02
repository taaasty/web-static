###* @jsx React.DOM ###

module.exports = window.Notification = React.createClass

  propTypes:
    type:    React.PropTypes.string
    text:    React.PropTypes.string.isRequired
    timeout: React.PropTypes.number

  getDefaultProps: ->
    type:    'success'
    timeout: 3000

  componentDidMount: ->
    $component = $( @getDOMNode() )
    $component.css marginLeft: -($component.width() / 2)
    @timeout = setTimeout (=> @hide()), this.props.timeout

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

  hide: ->
    $component = $( @getDOMNode() )
    $component.fadeOut 'fast', -> @parentNode.remove()

  render: ->
   `<div className={"notice notice--" + this.props.type} onClick={this.hide}>
      <div className="notice__inner">{this.props.text}</div>
    </div>`