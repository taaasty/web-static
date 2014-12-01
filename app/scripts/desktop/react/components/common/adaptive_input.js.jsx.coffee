###* @jsx React.DOM ###

window.AdaptiveInput = React.createClass

  propTypes:
    type:        React.PropTypes.string
    value:       React.PropTypes.string
    placeholder: React.PropTypes.string
    required:    React.PropTypes.bool
    disabled:    React.PropTypes.bool
    autoFocus:   React.PropTypes.bool
    className:   React.PropTypes.string
    onChange:    React.PropTypes.func.isRequired

  getDefaultProps: ->
    type: 'text'

  render: ->
   `<input type={ this.props.type }
           value={ this.props.value }
           placeholder={ this.props.placeholder }
           required={ this.props.required }
           disabled={ this.props.disabled }
           autoFocus={ this.props.autoFocus }
           className={ this.props.className }
           onChange={ this.handleChange } />`

  handleChange: ->
    @props.onChange @getDOMNode().value