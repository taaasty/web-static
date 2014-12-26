cx                              = require 'react/lib/cx'
HeroActions_DropdownMenu_Button = require './dropdown_menu/buttons/button'
HeroActions_DropdownMenu_Popup  = require './dropdown_menu/popup'
{ PropTypes } = React

CLOSE_STATE = 'close'
OPEN_STATE  = 'open'

module.exports = React.createClass
  displayName: 'HeroActions_DropdownMenu'

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
                 userId={ @props.userId }
                 status={ @props.status }
                 onClose={ @activateCloseState } />
           </div>

  isOpenState: -> @state.currentState is OPEN_STATE

  activateCloseState: -> @setState(currentState: CLOSE_STATE)
  activateOpenState:  -> @setState(currentState: OPEN_STATE)

  toggleOpenState: ->
    if @isOpenState() then @activateCloseState() else @activateOpenState()
