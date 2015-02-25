{ PropTypes } = React

UserToolbarListSubListItem = React.createClass
  displayName: 'UserToolbarListSubListItem'

  propTypes:
    title:   PropTypes.string.isRequired
    icon:    PropTypes.string.isRequired
    href:    PropTypes.string
    onClick: PropTypes.func

  componentDidMount: ->
    link = @refs.link.getDOMNode()

    $(link).tooltip
      title: @props.title
      placement: 'right'
      container: '.toolbar--main'

  componentWillUnmount: ->
    link = @refs.link.getDOMNode()

    $(link).tooltip 'destroy'

  render: ->
    <li className="toolbar__subnav-item">
      <a ref="link"
         href={ @props.href }
         className="toolbar__subnav-link">
        <i className={ 'icon ' + @props.icon } />
        <span className="toolbar__subnav-text">
          { @props.title }
        </span>
      </a>
    </li>

module.exports = UserToolbarListSubListItem