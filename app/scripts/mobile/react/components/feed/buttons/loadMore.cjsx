{ PropTypes } = React

#TODO: i18n
TEXT = 'Загрузить еще'

FeedLoadMoreButton = React.createClass
  displayName: 'FeedLoadMoreButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="load-more-button"
            onClick={ @props.onClick }>
      { TEXT }
    </button>

module.exports = FeedLoadMoreButton