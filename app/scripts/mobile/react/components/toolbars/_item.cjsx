classnames = require 'classnames'
{ PropTypes } = React

ToolbarItem = React.createClass
  displayName: 'ToolbarItem'

  propTypes:
    icon:           PropTypes.string.isRequired
    title:          PropTypes.string.isRequired
    href:           PropTypes.string
    active:         PropTypes.bool
    disabled:       PropTypes.bool
    badgeCount:     PropTypes.number
    badgeClassName: PropTypes.string
    onSelect:       PropTypes.func

  getDefaultProps: ->
    active:   false
    disabled: false

  render: ->
    toolbarItemClasses = classnames('toolbar__popup-item', {
      '__active':   @props.active
      '__disabled': @props.disabled
    })

    return <li className={ toolbarItemClasses }>
             <a href={ @props.href }
                className="toolbar__popup-link"
                onClick={ @handleClick }>
               <i className={ 'icon ' + @props.icon } />
               { @props.title } { @renderBadge() }
             </a>
           </li>

  renderBadge: ->
    if @props.badgeCount
      <span className={ @props.badgeClassName }>
        { @props.badgeCount }
      </span>

  handleClick: (e) ->
    if !@props.href && !@props.disabled
      e.preventDefault()
      @props.onSelect()

module.exports = ToolbarItem