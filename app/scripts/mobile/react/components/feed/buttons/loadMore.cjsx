{ PropTypes } = React

TEXT = -> t 'feed_load_more_button'

FeedLoadMoreButton = React.createClass
  displayName: 'FeedLoadMoreButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="load-more-button"
            onClick={ @props.onClick }>
      { TEXT() }
    </button>

module.exports = FeedLoadMoreButton