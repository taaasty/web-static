cx                              = require 'react/lib/cx'
ClickOutsideMixin               = require '../../../mixins/clickOutside'
HeroActions_DropdownMenu_Button = require './dropdownMenu/buttons/button'
HeroActions_DropdownMenu_Popup  = require './dropdownMenu/popup'
{ PropTypes } = React

CLOSE_STATE = 'close'
OPEN_STATE  = 'open'

HeroActions_DropdownMenu = React.createClass
  displayName: 'HeroActions_DropdownMenu'
  mixins: [ClickOutsideMixin]

  propTypes:
    userId: PropTypes.number.isRequired
    status: PropTypes.string.isRequired

  getInitialState: ->
    currentState: CLOSE_STATE

  render: ->
    menuClasses = cx
      'hero__user-actions': true
      '__open': @isOpenState()

    return <div className={ menuClasses }>
             <HeroActions_DropdownMenu_Button onClick={ @toggleOpenState } />
             <HeroActions_DropdownMenu_Popup
                 arrangement="top"
                 visible={ @isOpenState() }
                 userId={ @props.userId }
                 status={ @props.status }
                 onClose={ @activateCloseState } />
           </div>

  isOpenState: -> @state.currentState is OPEN_STATE

  activateCloseState: -> @setState(currentState: CLOSE_STATE)
  activateOpenState:  -> @setState(currentState: OPEN_STATE)

  toggleOpenState: ->
    if @isOpenState() then @activateCloseState() else @activateOpenState()

module.exports = HeroActions_DropdownMenu