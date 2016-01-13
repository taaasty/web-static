LinkedStateMixin = require 'react-addons-linked-state-mixin';

window.MessagesPopup_ChooserDropdown = React.createClass
  mixins: [LinkedStateMixin]

  propTypes:
    onCancel: React.PropTypes.func.isRequired
    onSubmit: React.PropTypes.func.isRequired

  getInitialState: ->
    query: ''

  componentDidMount: ->
    @refs.chooserInput.getDOMNode().focus()

  render: ->
    if @state.query
      chooserResults = <MessagesPopup_ChooserResults ref="chooserResults"
                                                     query={ this.state.query }
                                                     onSubmit={ this.props.onSubmit } />

    return <div className="messages__chooser-dropdown">
             <input ref="chooserInput"
                    type="text"
                    className="messages__chooser-input"
                    valueLink={ this.linkState('query') }
                    onKeyDown={ this.handleKeyDown } />
             { chooserResults }
           </div>

  handleKeyDown: (e) ->
    chooserResults = @refs.chooserResults

    switch e.key
      when 'Enter'
        e.preventDefault()
        if chooserResults?
          @props.onSubmit chooserResults.getSelectedUserId()
        break
      when 'Escape'
        e.preventDefault()
        @props.onCancel()
        break
      when 'ArrowUp'
        e.preventDefault()
        chooserResults.selectPreviousResult()
        break
      when 'ArrowDown'
        e.preventDefault()
        chooserResults.selectNextResult()
        break