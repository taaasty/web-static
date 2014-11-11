###* @jsx React.DOM ###

window.SearchField = React.createClass

  propTypes:
    query:    React.PropTypes.string
    onCancel: React.PropTypes.func.isRequired
    onSubmit: React.PropTypes.func.isRequired

  componentDidMount: -> @selectAllText()

  render: ->
   `<form className="search__form">
      <input ref="searchInput"
             type="text"
             placeholder="Поиск"
             defaultValue={ this.props.query }
             className="search__input"
             onBlur={ this.props.onCancel }
             onFocus={ this.putCursorAtEnd }
             onKeyDown={ this.handleKeyDown } />
    </form>`

  selectAllText: ->
    searchInput = @refs.searchInput.getDOMNode()
    searchInput.setSelectionRange 0, searchInput.value.length

  putCursorAtEnd: ->
    searchInput       = @refs.searchInput.getDOMNode()
    searchInput.value = searchInput.value

  handleKeyDown: (e) ->
    switch e.key
      when 'Escape'
        e.preventDefault()
        @props.onCancel()
      when 'Enter'
        e.preventDefault()
        @props.onSubmit()