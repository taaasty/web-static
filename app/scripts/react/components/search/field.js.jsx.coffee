###* @jsx React.DOM ###

ENTER_KEYCODE = 13
ESC_KEYCODE   = 27

window.SearchField = React.createClass

  propTypes:
    text:     React.PropTypes.string
    onCancel: React.PropTypes.func.isRequired
    onSubmit: React.PropTypes.func.isRequired

  render: ->
   `<form className="search__form">
      <input ref="searchField"
             type="text"
             placeholder="Поиск"
             defaultValue={ this.props.text }
             className="search__input"
             onKeyDown={ this.onKeyDown } />
    </form>`

  onKeyDown: (e) ->
    switch e.which
      when ESC_KEYCODE
        e.preventDefault()

        @props.onCancel()
      when ENTER_KEYCODE
        e.preventDefault()

        @props.onSubmit()