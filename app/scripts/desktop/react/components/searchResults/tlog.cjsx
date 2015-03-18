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

  componentDidMount: ->
    $(window).on 'scroll', @handleScroll

  componentWillUnmount: ->
    $(window).off 'scroll', @handleScroll

  render: ->
    if @props.loading
      spinner = <div className="page-loader"><Spinner size={ 24 } /></div>

    return <div className="content-area">
             <div className="content-area__bg" />
             <div className="content-area__inner">
               <section className="posts"
                        dangerouslySetInnerHTML={{ __html: @props.html }} />
               { spinner }
             </div>
           </div>

  handleScroll: ->
    if @props.canLoad
      nearBottom = $(window).scrollTop() + $(window).height() > $(document).height() - THRESHOLD
      @props.onLoadNextPage() if nearBottom

module.exports = SearchResultsTlog