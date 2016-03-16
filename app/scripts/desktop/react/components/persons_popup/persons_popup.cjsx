{ findDOMNode, unmountComponentAtNode } = require 'react-dom';
Popup = require '../Popup';
DEFAULT_PANEL = 'followings'

window.PersonsPopup = React.createClass
  displayName: 'PersonsPopup'
  mixins: [ RequesterMixin ]

  propTypes:
    panelName: React.PropTypes.string

  getDefaultProps: ->
    panelName: DEFAULT_PANEL

  getInitialState: ->
    _.extend @getStateFromStores(), currentTab: @props.panelName

  componentDidMount: ->
    CurrentUserStore.addChangeListener @onStoresChange
    RelationshipsStore.addChangeListener @onStoresChange

  componentWillUnmount: ->
    CurrentUserStore.removeChangeListener @onStoresChange
    RelationshipsStore.removeChangeListener @onStoresChange

  close: ->
    unmountComponentAtNode(findDOMNode(this).parentNode);

  render: ->
    <Popup
      draggable
      className="popup--persons popup--dark"
      clue="persons_popup"
      onClose={this.close}
      title={ i18n.t('persons_popup_header') }
    >

      <PersonsPopup_Menu
          user={ @state.user }
          currentTab={ @state.currentTab }
          onSelect={ @selectTab } />

      { @renderCurrentPanel() }

    </Popup>

  renderCurrentPanel: ->
    CurrentPanel = switch @state.currentTab
      when 'requested'  then PersonsPopup_RequestedPanel
      when 'followings' then PersonsPopup_FollowingsPanel
      when 'followers'  then PersonsPopup_FollowersPanel
      when 'ignored'    then PersonsPopup_IgnoredPanel
      when 'vkontakte'  then PersonsPopup_VkontaktePanel
      when 'facebook'   then PersonsPopup_FacebookPanel
      else console.debug? 'Unknown type of current tab', @state.currentTab

    return <CurrentPanel />

# Temporarily exclude guessed tab
# <PersonsPopup_GuessesPanel isActive={ this.state.currentTab == 'guesses' }
#                            total_count={ this.state.relationships.guesses.total_count }
#                            onLoad={ onLoad.bind(this, 'guesses') } />

  isProfilePrivate: ->
    @state.user.is_privacy is true

  selectTab: (type) ->
    @setState(currentTab: type)

  getStateFromStores: ->
    user:          CurrentUserStore.getUser()
    relationships: RelationshipsStore.getRelationships()

  onStoresChange: ->
    @setState @getStateFromStores()