###* @jsx React.DOM ###

CLOSED = 'closed'
OPENED = 'opened'

window.Search = React.createClass

  propTypes:
    searchUrl: React.PropTypes.string
    query:     React.PropTypes.string

  getInitialState: ->
    searchUrl:    @props.searchUrl || window.location
    currentState: if @props.query then OPENED else CLOSED

  render: ->
    searchClasses = React.addons.classSet
      'search':        true
      'state--active': @isOpen()

    return `<div className={ searchClasses }>
              <SearchField ref="searchField"
                           query={ this.props.query }
                           onCancel={ this.closeSearch }
                           onSubmit={ this.submit } />
              <SearchButton onClick={ this.onButtonClick } />
            </div>`

  openSearch:  -> @setState currentState: OPENED
  closeSearch: -> @setState currentState: CLOSED

  submit: ->
    query = @refs.searchField.refs.searchField.getDOMNode().value
    return if query.length == 0

    url   = @_prepareSearchUrl query

    # TODO Рисовать какой-то спиннер или прогресс, например полоску наверху
    #

    window.location = url

  isOpen: -> @state.currentState != CLOSED

  _prepareSearchUrl: (query) ->
    @state.searchUrl + '?q=' + query

  onButtonClick: ->
    if @isOpen() then @submit() else @openSearch()
