SearchActions = require '../../actions/search'
SearchResultsTlog = require './tlog'
SearchResultsFeed = require './feed'
{ PropTypes } = React

SearchResults = React.createClass
  displayName: 'SearchResults'

  propTypes:
    q: PropTypes.string.isRequired
    style: PropTypes.string.isRequired
    searchUrl: PropTypes.string

  getDefaultProps: ->
    searchUrl: window.location.href
    # searchUrl: 'http://taaasty.com/best'

  getInitialState: ->
    html: ''
    page: 1
    loading: false
    everythingLoaded: false

  componentDidMount: ->
    @loadPage(@state.page)

  render: ->
    switch @props.style
      when 'tlog'
        <SearchResultsTlog
            html={ @state.html }
            loading={ @state.loading }
            canLoad={ !@state.loading || !@state.everythingLoaded }
            onLoadNextPage={ @loadNextPage } />
      when 'feed'
        <SearchResultsFeed
            html={ @state.html }
            loading={ @state.loading }
            canLoad={ !@state.loading || !@state.everythingLoaded }
            onLoadNextPage={ @loadNextPage } />
      else null

  loadPage: (page) ->
    return if @state.loading
    {q, searchUrl, style} = @props

    @setState(loading: true)

    SearchActions.loadNextPage {q, url: searchUrl, page, style}
      .then (html) =>
        if html is ''
          @setState(everythingLoaded: true)
          return

        newHtml = if @state.html then @state.html + html else html

        @setState {html: newHtml, page}

        # Mount new components from html
        $(document).trigger 'page:change'
      .always =>
        @setState(loading: false)

  loadNextPage: ->
    nextPage = @state.page + 1
    @loadPage nextPage

module.exports = SearchResults