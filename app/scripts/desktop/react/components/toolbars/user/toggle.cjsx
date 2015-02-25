{ PropTypes } = React

UserToolbarToggle = React.createClass
  displayName: 'UserToolbarToggle'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="toolbar__toggle"
         onClick={ @handleClick }>
      <i className="icon icon--menu" />
    </div>

  handleClick: ->
    @props.onClick()

module.exports = UserToolbarToggle