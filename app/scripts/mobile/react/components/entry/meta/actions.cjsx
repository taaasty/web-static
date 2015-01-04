cx                            = require 'react/lib/cx'
ClickOutsideMixin             = require '../../../mixins/clickOutside'
EntryMetaActions_Button       = require './actions/buttons/button'
EntryMetaActions_DropdownMenu = require './actions/dropdown_menu'
{ PropTypes } = React

OPEN_STATE  = 'open'
CLOSE_STATE = 'close'

EntryMetaActions = React.createClass
  displayName: 'EntryMetaActions'
  mixins: [ClickOutsideMixin]

  propTypes:
    entry: PropTypes.object.isRequired

  getInitialState: ->
    currentState: CLOSE_STATE

  render: ->
    actionsClasses = cx
      'meta-actions': true
      '__open': @isOpenState()

    return <div className={ actionsClasses }>
             <EntryMetaActions_Button onClick={ @toggleOpenState } />
             <EntryMetaActions_DropdownMenu
                 entry={ @props.entry }
                 visible={ @isOpenState() } />
           </div>

  isOpenState: -> @state.currentState is OPEN_STATE

  activateCloseState: -> @setState(currentState: CLOSE_STATE)
  activateOpenState:  -> @setState(currentState: OPEN_STATE)

  toggleOpenState: ->
    if @isOpenState() then @activateCloseState() else @activateOpenState()

module.exports = EntryMetaActions