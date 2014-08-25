###* @jsx React.DOM ###

SHOW_STATE = 'show'
EDIT_STATE = 'edit'

window.SettingsEmail = React.createClass

  propTypes:
    email:             React.PropTypes.string.isRequired
    confirmationEmail: React.PropTypes.any.isRequired
    isConfirmed:       React.PropTypes.bool.isRequired
    saveCallback:      React.PropTypes.func.isRequired

  getInitialState: ->
    currentState: SHOW_STATE

  render: ->
    if @isShowing()
      `<SettingsEmailShow email={ this.props.email }
                          confirmationEmail={ this.props.confirmationEmail }
                          isConfirmed={ this.props.isConfirmed }
                          onClickEdit={ this.enableEditMode } />`
    else
      `<SettingsEmailEdit email={ this.props.email }
                          onCancelEdit={ this.enableShowMode }
                          onSubmitEdit={ this.onSubmitEdit }
                          onBlurEdit={ this.enableShowMode } />`

  enableEditMode: -> @setState currentState: EDIT_STATE
  enableShowMode: -> @setState currentState: SHOW_STATE

  isEditing: -> @state.currentState is EDIT_STATE
  isShowing: -> @state.currentState is SHOW_STATE

  onSubmitEdit: (newEmail) ->
    @props.saveCallback 'email', newEmail
    @enableShowMode()