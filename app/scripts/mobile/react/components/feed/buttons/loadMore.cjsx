{ PropTypes } = React

FeedLoadMoreButton = React.createClass
  displayName: 'FeedLoadMoreButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="load-more-button"
            onClick={ @props.onClick }>
      { i18n.t('buttons.feed_load_more') }
    </button>

module.exports = FeedLoadMoreButton