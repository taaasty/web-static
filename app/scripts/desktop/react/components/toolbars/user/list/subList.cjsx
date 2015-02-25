{ PropTypes } = React

UserToolbarListSubList = React.createClass
  displayName: 'UserToolbarListSubList'

  propTypes:
    opened: PropTypes.bool.isRequired

  componentDidUpdate: (prevProps, prevState) ->
    subNav = @getDOMNode()

    if prevProps.opened isnt @props.opened
      if @props.opened
        $(subNav).stop().slideDown 300
      else
        $(subNav).stop().slideUp 300

  render: ->
    <ul className="toolbar__subnav">
      { @props.children }
    </ul>

module.exports = UserToolbarListSubList