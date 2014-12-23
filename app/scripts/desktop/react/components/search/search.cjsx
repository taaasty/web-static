cx = require 'react/lib/cx'

CLOSED = 'closed'
OPENED = 'opened'

window.Search = React.createClass

  propTypes:
    searchUrl: React.PropTypes.string
    query:     React.PropTypes.string

  getInitialState: ->
    currentState: if @props.query then OPENED else CLOSED

  render: ->
    searchClasses = cx
      'search':        true
      'state--active': @isOpen()

    return <div className={ searchClasses }>
             <SearchField ref="searchField"
                          query={ this.props.query }
                          onCancel={ this.closeSearch }
                          onSubmit={ this.submit } />
             <SearchButton onClick={ this.handleButtonClick } />
           </div>

  openSearch: ->
    @setState currentState: OPENED

    @refs.searchField.refs.searchInput.getDOMNode().focus()
  closeSearch: -> @setState currentState: CLOSED

  submit: ->
    query = @refs.searchField.refs.searchInput.getDOMNode().value
    return if query.length == 0

    url = @_prepareSearchUrl query

    # TODO Рисовать какой-то спиннер или прогресс, например полоску наверху

    window.location = url

  isOpen: -> @state.currentState != CLOSED

  _prepareSearchUrl: (query) ->
    url = @props.searchUrl || window.location.origin + window.location.pathname
    url + '?q=' + query

  handleButtonClick: (e) ->
    e.stopPropagation()

    if @isOpen() then @submit() else @openSearch()