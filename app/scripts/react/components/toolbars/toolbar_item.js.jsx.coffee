###* @jsx React.DOM ###

window.ToolbarItem = ToolbarItem = React.createClass

  propTypes:
    activeItem: React.PropTypes.string.isRequired
    icon:       React.PropTypes.string.isRequired
    title:      React.PropTypes.string.isRequired
    onClick:    React.PropTypes.func.isRequired

  getDefaultProps: ->
    isActive: false

  render: ->
    linkClasses = React.addons.classSet 'toolbar__popup-link': true, 'state--single': @isActive()

    return `<li className="toolbar__popup-item">
              <a onClick={ this.props.onClick }
                 className={ linkClasses }>
                <i className={"icon icon--" + this.props.icon}></i>
                { this.props.title }
              </a>
            </li>`

  isActive: ->
    @props.activeItem is @props.icon

module.exports = ToolbarItem