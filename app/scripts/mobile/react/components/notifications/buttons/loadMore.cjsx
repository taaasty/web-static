{ PropTypes } = React

NotificationsLoadMoreButton = React.createClass
  displayName: 'NotificationsLoadMoreButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="load-more-button"
            onClick={ @handleClick }>
      Загрузить еще
    </button>

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick()

module.exports = NotificationsLoadMoreButton