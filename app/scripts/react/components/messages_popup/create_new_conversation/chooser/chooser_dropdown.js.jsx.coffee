###* @jsx React.DOM ###

window.MessagesPopup_ChooserDropdown = React.createClass
  mixins: [React.addons.LinkedStateMixin]

  propTypes:
    onCancel: React.PropTypes.func.isRequired
    onSubmit: React.PropTypes.func.isRequired

  getInitialState: ->
    query: ''

  componentDidMount: ->
    @refs.chooserInput.getDOMNode().focus()

  render: ->
    if @state.query
      chooserResults = `<MessagesPopup_ChooserResults query={ this.state.query } />`

    return `<div className="messages__chooser-dropdown">
              <input ref="chooserInput"
                     type="text"
                     className="messages__chooser-input"
                     valueLink={ this.linkState('query') }
                     onKeyDown={ this.handleKeyDown }
                     onBlur={ false } />

              { chooserResults }

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