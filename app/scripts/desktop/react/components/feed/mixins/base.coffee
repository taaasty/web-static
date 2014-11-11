THRESHOLD = 400

window.FeedBaseMixin =

  propTypes:
    isLoadingNew:      React.PropTypes.bool
    isLoadingPrevious: React.PropTypes.bool
    onBottomNear:      React.PropTypes.func.isRequired

  componentDidMount: ->
    $(window).on 'scroll', @handleScroll

  componentWillUnmount: ->
    $(window).off 'scroll', @handleScroll

  getLastItemId: ->
    $container = $( @refs.container.getDOMNode() )

    $container.children().last().data 'id'

  isLoading: -> !@props.isLoadingNew && !@props.isLoadingPrevious

  handleScroll: ->
    isNearBottom = $(window).scrollTop() + $(window).height() > $(document).height() - THRESHOLD

    if isNearBottom
      lastItemId = @getLastItemId()
      @props.onBottomNear lastItemId