cx                             = require 'react/lib/cx'
ActionMenuButton               = require '../../buttons/user/action_menu'
HeroActions_DropdownMenu_Popup = require './dropdown_menu/popup'
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
    status: @props.status

  render: ->
    menuClasses = cx
      'hero__user-actions': true
      '__open': @isOpenState()

    return <div className={ menuClasses }
                onClick={ this.toggleOpenState }>
             <ActionMenuButton />
             <HeroActions_DropdownMenu_Popup
                 arrangement="top"
                 userId={ this.props.userId }
                 status={ this.props.status } />
           </div>

  isOpenState: -> @state.currentState is OPEN_STATE

  activateCloseState: -> @setState(currentState: CLOSE_STATE)
  activateOpenState:  -> @setState(currentState: OPEN_STATE)

  toggleOpenState: ->
    if @isOpenState() then @activateCloseState() else @activateOpenState()