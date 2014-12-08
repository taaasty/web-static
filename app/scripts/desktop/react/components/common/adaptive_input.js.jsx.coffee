###* @jsx React.DOM ###

window.AdaptiveInput = React.createClass

  propTypes:
    type:        React.PropTypes.string
    value:       React.PropTypes.string
    placeholder: React.PropTypes.string
    required:    React.PropTypes.bool
    checked:     React.PropTypes.bool
    disabled:    React.PropTypes.bool
    autoFocus:   React.PropTypes.bool
    id:          React.PropTypes.string
    className:   React.PropTypes.string
    onChange:    React.PropTypes.func.isRequired

  getDefaultProps: ->
    type: 'text'

  render: ->
   `<input type={ this.props.type }
           value={ this.props.value }
           placeholder={ this.props.placeholder }
           required={ this.props.required }
           checked={ this.props.checked }
           disabled={ this.props.disabled }
           autoFocus={ this.props.autoFocus }
           id={ this.props.id }
           className={ this.props.className }
           onChange={ this.handleChange } />`

  handleChange: ->
    @props.onChange @getDOMNode().value