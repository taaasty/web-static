InfiniteScroll = require '../common/infiniteScroll/index'
{ PropTypes } = React

windowHeight = $(window).height()
THRESHOLD = windowHeight * 2

SearchResultsFeed = React.createClass
  displayName: 'SearchResultsFeed'

  propTypes:
    html: PropTypes.string.isRequired
    loading: PropTypes.bool.isRequired
    canLoad: PropTypes.bool.isRequired
    onLoadNextPage: PropTypes.func.isRequired

  render: ->
    <div className="bricks-wrapper">
      <InfiniteScroll
          loading={ @props.loading }
          canLoad={ @props.canLoad }
          onLoad={ @props.onLoadNextPage }
          onAfterLoad={ @initGridManager }>
        <section ref="container"
                 className="bricks"
                 dangerouslySetInnerHTML={{ __html: @props.html }} />
      </InfiniteScroll>
    </div>

  initGridManager: ->
    $container = $( @refs.container.getDOMNode() )

    $container.shapeshift
      selector: '.brick'
      colWidth: 302
      enableDrag: false
      enableCrossDrop: false
      gutterX: 20
      gutterY: 20
      paddingX: 0
      paddingY: 0

module.exports = SearchResultsFeed