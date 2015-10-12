{ PropTypes } = React

windowHeight = $(window).height()
THRESHOLD = windowHeight * 2

InfiniteScroll = React.createClass
  displayName: 'InfiniteScroll'

  propTypes:
    children: PropTypes.oneOfType([
      PropTypes.element, PropTypes.array
    ]).isRequired
    loading: PropTypes.bool.isRequired
    canLoad: PropTypes.bool.isRequired
    onLoad: PropTypes.func.isRequired
    onAfterLoad: PropTypes.func

  componentDidMount: ->
    @_prefill()
    $(window).on 'scroll', @handleScroll

  componentDidUpdate: ->
    @_prefill()
    $(document).trigger('domChanged')
    @props.onAfterLoad?()

  componentWillUnmount: ->
    $(window).off 'scroll', @handleScroll

  render: ->
    if @props.loading
      spinner = <div className="page-loader"><Spinner size={ 24 } /></div>

    return <div>
             { @props.children }
             { spinner }
           </div>

  _prefill: ->
    $node = $(@getDOMNode())
    $window = $(window)

    needsPrefill = ->
      $node.height() <= $window.height()

    @_prefill = ->
      @props.onLoad() if @props.canLoad and needsPrefill()

    @_prefill()

  handleScroll: ->
    if @props.canLoad
      nearBottom = $(window).scrollTop() + $(window).height() > $(document).height() - THRESHOLD
      @props.onLoad() if nearBottom

module.exports = InfiniteScroll