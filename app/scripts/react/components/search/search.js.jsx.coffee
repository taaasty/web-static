###* @jsx React.DOM ###

CLOSED = 'closed'
OPENED = 'opened'

window.Search = React.createClass

  propTypes:
    searchUrl: React.PropTypes.string.isRequired
    text:      React.PropTypes.string

  getInitialState: ->
    currentState: if @props.text then OPENED else CLOSED

  render: ->
    searchClasses = React.addons.classSet
      'search':        true
      'state--active': @isOpen()

    return `<div className={ searchClasses }>
              <SearchField ref="searchField"
                           text={ this.props.text }
                           onCancel={ this.closeSearch }
                           onSubmit={ this.submit } />
              <SearchButton onClick={ this.onButtonClick } />
            </div>`

  openSearch:  -> @setState currentState: OPENED
  closeSearch: -> @setState currentState: CLOSED

  submit: ->
    query = @refs.searchField.refs.searchField.getDOMNode().value
    url   = @_prepareSearchUrl query

    return if query.length == 0

    window.location = url

  isOpen: -> @state.currentState != CLOSED

  _prepareSearchUrl: (query) ->
    @props.searchUrl + '?q=' + query

  onButtonClick: ->
    if @isOpen() then @submit() else @openSearch()