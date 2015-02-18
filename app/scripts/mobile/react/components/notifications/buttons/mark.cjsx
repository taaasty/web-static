{ PropTypes } = React

NotificationsMarkButton = React.createClass
  displayName: 'NotificationsMarkButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="notifications__mark-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.notifications_mark_all_as_read') }
    </button>

  handleClick: ->
    @props.onClick()

module.exports = NotificationsMarkButton