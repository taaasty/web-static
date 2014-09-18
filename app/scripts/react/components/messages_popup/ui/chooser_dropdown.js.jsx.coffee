###* @jsx React.DOM ###

window.MessagesPopup_UIChooserDropdown = React.createClass

  propTypes:
    onCancel: React.PropTypes.func.isRequired
    onSubmit: React.PropTypes.func.isRequired

  componentDidMount: ->
    @refs.chooserInput.getDOMNode().focus()

  render: ->
   `<div className="messages__chooser-dropdown">
      <input ref="chooserInput"
             type="text"
             className="messages__chooser-input js-messages-chooser-input"
             onKeyDown={ this.handleKeyDown }
             onBlur={ this.props.onCancel } />
      <div className="messages__chooser-results js-messages-chooser-results" />
    </div>`

  handleKeyDown: (e) ->
    switch e.key
      when 'Escape'
        e.preventDefault()
        @props.onCancel()

      when 'Enter'
        e.preventDefault()
        if e.target.value isnt ''
          @props.onSubmit e.target.value 