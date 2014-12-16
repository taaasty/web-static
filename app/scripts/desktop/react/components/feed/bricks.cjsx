window.FeedBricks = React.createClass
  mixins: [FeedBaseMixin]

  propTypes:
    feedHtml:          React.PropTypes.string
    isLoadingNew:      React.PropTypes.bool
    isLoadingPrevious: React.PropTypes.bool

  componentDidUpdate: (prevProps) ->
    @initGridManager() if @props.feedHtml isnt prevProps.feedHtml

  render: ->
    if @props.isLoadingPrevious
      spinnerAfter = <div className="page-loader"><Spinner size={ 24 } /></div>
    
    if @props.isLoadingNew
      spinnerBefore = <div className="page-loader"><Spinner size={ 24 } /></div>

    return <div className="bricks-wrapper">
             { spinnerBefore }
             <section ref="container"
                      className="bricks"
                      dangerouslySetInnerHTML={{__html: this.props.feedHtml}}>
             </section>
             { spinnerAfter }
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