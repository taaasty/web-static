i18n = require 'i18next'
{ PropTypes } = React

TEXT = -> i18n.t 'feed_load_more_button'

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