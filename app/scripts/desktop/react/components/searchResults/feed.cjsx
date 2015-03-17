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

  componentDidMount: ->
    $(window).on 'scroll', @handleScroll

  componentDidUpdate: (prevProps) ->
    @initGridManager() if @props.html isnt prevProps.html

  componentWillUnmount: ->
    $(window).off 'scroll', @handleScroll

  render: ->
    if @props.loading
      spinner = <div className="page-loader"><Spinner size={ 24 } /></div>

    return <div className="bricks-wrapper">
             <section ref="container"
                      className="bricks"
                      dangerouslySetInnerHTML={{ __html: @props.html }} />
             { spinner }
           </div>

  initGridManager: ->
    $container = $( @refs.container.getDOMNode() )

    $container.shapeshift {
      selector: '.brick'
      colWidth: 302
      enableDrag: false
      enableCrossDrop: false
      gutterX: 20
      gutterY: 20
      paddingX: 0
      paddingY: 0
    }

  handleScroll: ->
    if @props.canLoad
      nearBottom = $(window).scrollTop() + $(window).height() > $(document).height() - THRESHOLD
      @props.onLoadNextPage() if nearBottom

module.exports = SearchResultsFeed