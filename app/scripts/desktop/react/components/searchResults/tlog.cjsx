InfiniteScroll = require '../common/infiniteScroll/index'
{ PropTypes } = React

windowHeight = $(window).height()
THRESHOLD = windowHeight * 2

SearchResultsTlog = React.createClass
  displayName: 'SearchResultsTlog'

  propTypes:
    html: PropTypes.string.isRequired
    loading: PropTypes.bool.isRequired
    canLoad: PropTypes.bool.isRequired
    onLoadNextPage: PropTypes.func.isRequired

  render: ->
    <div className="content-area">
      <div className="content-area__bg" />
      <div className="content-area__inner">
        <InfiniteScroll
            loading={ @props.loading }
            canLoad={ @props.canLoad }
            onLoad={ @props.onLoadNextPage }>
          <section
              className="posts"
              dangerouslySetInnerHTML={{ __html: @props.html }} />
        </InfiniteScroll>
      </div>
    </div>

module.exports = SearchResultsTlog