{ PropTypes } = React

NotificationsLoadMoreButton = React.createClass
  displayName: 'NotificationsLoadMoreButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="load-more-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.notifications_load_more') }
    </button>

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick()

module.exports = NotificationsLoadMoreButton