cloneWithProps = require 'react/lib/cloneWithProps'
{ PropTypes } = React

UserToolbarListItem = React.createClass
  displayName: 'UserToolbarListItem'

  propTypes:
    title:          PropTypes.string.isRequired
    icon:           PropTypes.string.isRequired
    href:           PropTypes.string
    badgeCount:     PropTypes.number
    badgeClassName: PropTypes.string
    stayOpen:       PropTypes.bool
    onClick:        PropTypes.func

  getInitialState: ->
    open: false

  componentDidMount: ->
    link = @refs.link.getDOMNode()

    $(link).tooltip
      title: @props.title
      placement: 'right'
      container: '.toolbar--main'

  componentWillReceiveProps: (nextProps) ->
    @close() unless nextProps.stayOpen and @isOpen()

  componentWillUnmount: ->
    link = @refs.link.getDOMNode()

    $(link).tooltip 'destroy'

  render: ->
    children = React.Children.map @props.children, (child) =>
      cloneWithProps child, opened: @isOpen()

    <li className="toolbar__nav-item"
        onMouseEnter={ @handleMouseEnter }
        onMouseLeave={ @handleMouseLeave }>
      <a ref="link"
         href={ @props.href }
         className="toolbar__nav-link"
         onClick={ @handeLinkClick }>
        <i className={ 'icon ' + @props.icon } />
        <span className="toolbar__nav-text">
          { @props.title }
        </span>
        { @renderBadge() }
      </a>
      { children }
    </li>

  renderBadge: ->
    if @props.badgeCount
      <span className={ @props.badgeClassName }>
        { @props.badgeCount }
      </span>

  isOpen: -> !!@state.open

  open:  -> @setState(open: true)
  close: -> @setState(open: false)

  handleMouseEnter: ->
    @open()

  handleMouseLeave: ->
    @close() unless @props.stayOpen

  handeLinkClick: (e) ->
    if @props.onClick?
      e.preventDefault()
      @props.onClick()

module.exports = UserToolbarListItem