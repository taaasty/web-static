###* @jsx React.DOM ###

# TODO: i18n
PERSON_POPUP_TITLE = 'Управление подписками'

DEFAULT_PANEL = 'followings'

window.PersonsPopup = React.createClass
  mixins: ['ReactActivitiesMixin', RequesterMixin]

  propTypes:
    panelName: React.PropTypes.string

  getDefaultProps: ->
    panelName: DEFAULT_PANEL

  getInitialState: ->
    _.extend @getStateFromStores(), {
      currentTab: @props.panelName
    }

  componentDidMount: ->
    CurrentUserStore.addChangeListener @onStoresChange
    RelationshipsStore.addChangeListener @onStoresChange

  componentWillUnmount: ->
    CurrentUserStore.removeChangeListener @onStoresChange
    RelationshipsStore.removeChangeListener @onStoresChange

  render: ->
    currentPanel = @_getCurrentPanel()

    return `<Popup
                hasActivities={ this.hasActivities() }
                title={ PERSON_POPUP_TITLE }
                isDraggable={ true }
                colorScheme="dark"
                className="popup--persons">

              <PersonsPopup_Menu
                  user={ this.state.user }
                  currentTab={ this.state.currentTab }
                  onSelect={ this.selectTab } />

              { currentPanel }

            </Popup>`

# Temporarily exclude guessed tab
# <PersonsPopup_GuessesPanel isActive={ this.state.currentTab == 'guesses' }
#                            total_count={ this.state.relationships.guesses.total_count }
#                            activitiesHandler={ this.activitiesHandler }
#                            onLoad={ onLoad.bind(this, 'guesses') } />

# Old version of render. It will be here for couple days, until we realize which
# way of panel daisplaying more optimal
# render: ->
#   if @isProfilePrivate()
#     requestedPanel = `<PersonsPopup_RequestedPanel
#                           isActive={ this.state.currentTab == 'requested' }
#                           activitiesHandler={ this.activitiesHandler } />`

#   return `<Popup
#               hasActivities={ this.hasActivities() }
#               title={ PERSON_POPUP_TITLE }
#               isDraggable={ true }
#               colorScheme="dark"
#               className="popup--persons">

#             <PersonsPopup_Menu
#                 user={ this.state.user }
#                 currentTab={ this.state.currentTab }
#                 onSelect={ this.selectTab } />

#             <PersonsPopup_FollowingsPanel
#                 isActive={ this.state.currentTab == 'followings' }
#                 activitiesHandler={ this.activitiesHandler } />

#             <PersonsPopup_FollowersPanel
#                 isActive={ this.state.currentTab == 'followers' }
#                 activitiesHandler={ this.activitiesHandler } />

#             { requestedPanel }

#             <PersonsPopup_IgnoredPanel
#                 isActive={ this.state.currentTab == 'ignored' }
#                 activitiesHandler={ this.activitiesHandler } />

#           </Popup>`

  isProfilePrivate: ->
    @state.user.is_privacy is true

  selectTab: (type) ->
    @setState(currentTab: type)

  _getCurrentPanel: ->
    switch @state.currentTab
      when 'requested'  then `<PersonsPopup_RequestedPanel activitiesHandler={ this.activitiesHandler } />`
      when 'followings' then `<PersonsPopup_FollowingsPanel activitiesHandler={ this.activitiesHandler } />`
      when 'followers'  then `<PersonsPopup_FollowersPanel activitiesHandler={ this.activitiesHandler } />`
      when 'ignored'    then `<PersonsPopup_IgnoredPanel activitiesHandler={ this.activitiesHandler } />`
      else console.warn 'Unknown type of current tab', @state.currentTab

  getStateFromStores: ->
    user:          CurrentUserStore.getUser()
    relationships: RelationshipsStore.getRelationships()

  onStoresChange: ->
    @setState @getStateFromStores()