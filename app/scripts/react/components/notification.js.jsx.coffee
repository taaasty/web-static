###* @jsx React.DOM ###

module.exports = React.createClass

  getDefaultProps: ->
    type:    ''
    text:    ''

  componentDidMount: ->
    $component = $( @getDOMNode() )
    $component.css marginLeft: -($component.width() / 2)

  render: ->
   `<div className={"notice notice--" + this.props.type} onClick={this.props.onClick}>
      <div className="notice__inner">{this.props.text}</div>
    </div>`