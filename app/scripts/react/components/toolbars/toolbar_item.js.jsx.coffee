###* @jsx React.DOM ###

window.ToolbarItem = ToolbarItem = React.createClass

  propTypes:
    icon:     React.PropTypes.string.isRequired
    title:    React.PropTypes.string.isRequired
    href:     React.PropTypes.string
    active:   React.PropTypes.bool
    disabled: React.PropTypes.bool
    onSelect: React.PropTypes.func

  getDefaultProps: ->
    active:   false
    disabled: false

  render: ->
    toolbarItemClasses = React.addons.classSet {
      'toolbar__popup-item': true
      'state--active':   @isActive()
      'state--disabled': @isDisabled()
    }

    return `<li className={ toolbarItemClasses }>
              <a href={ this.props.href }
                 onClick={ this.handleSelect }
                 className="toolbar__popup-link">
                <i className={"icon icon--" + this.props.icon}></i>
                { this.props.title }
              </a>
            </li>`

  handleSelect: (e) ->
    if !@props.href && !@props.disabled
      e.preventDefault()
      @props.onSelect @props.icon

  isActive: -> @props.active

  isDisabled: -> @props.disabled

module.exports = ToolbarItem