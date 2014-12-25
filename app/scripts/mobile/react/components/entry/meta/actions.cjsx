cx                            = require 'react/lib/cx'
EntryMetaActions_DropdownMenu = require './actions/dropdown_menu'
{ PropTypes } = React

OPEN_STATE  = 'open'
CLOSE_STATE = 'close'

module.exports = React.createClass
  displayName: 'EntryMetaActions'

  propTypes:
    entry: PropTypes.object.isRequired

  getInitialState: ->
    currentState: CLOSE_STATE

  render: ->
    actionsClasses = cx
      'meta-actions': true
      '__open': @isOpenState()

    return <div className={ actionsClasses }
                onClick={ @toggleOpenState }>
             <EntryMetaActions_DropdownMenu entry={ @props.entry } />
           </div>

  isOpenState: -> @state.currentState is OPEN_STATE

  activateCloseState: -> @setState(currentState: CLOSE_STATE)
  activateOpenState:  -> @setState(currentState: OPEN_STATE)

  toggleOpenState: ->
    if @isOpenState() then @activateCloseState() else @activateOpenState()