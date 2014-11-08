###* @jsx React.DOM ###

# TODO: i18n
PERSON_POPUP_TITLE = 'Управление подписками'

DEFAULT_PANEL = 'followings'

window.PersonsPopup = React.createClass
  mixins: [ReactUnmountMixin, 'ReactActivitiesMixin', RequesterMixin]

  propTypes:
    panelName: React.PropTypes.string

  getDefaultProps: ->
    panelName: DEFAULT_PANEL

  getInitialState: ->
    _.extend @getStateFromStores(), {
      currentTab: @props.panelName
    }

  componentDidMount: ->
    CurrentUserStore.addChangeListener @onStoresChange()
    RelationshipsStore.addChangeListener @onStoresChange()

  componentWillUnmount: ->
    CurrentUserStore.removeChangeListener @onStoresChange()
    RelationshipsStore.removeChangeListener @onStoresChange()

  render: ->
    onLoad = -> @updateRelationships.apply @, arguments

    if @isProfilePrivate()
      requestsPanel = `<PersonsPopup_RequestsPanel
                           isActive={ this.state.currentTab == 'requests' }
                           activitiesHandler={ this.activitiesHandler }
                           onLoad={ onLoad.bind(this, 'requests') } />`

    return `<Popup hasActivities={ this.hasActivities() }
                   title={ PERSON_POPUP_TITLE }
                   isDraggable={ true }
                   colorScheme="dark"
                   className="popup--persons"
                   onClose={ this.unmount }>

              <PersonsPopup_Menu
                  user={ this.state.user }
                  currentTab={ this.state.currentTab }
                  onSelect={ this.selectTab } />

              <PersonsPopup_FollowingsPanel
                  isActive={ this.state.currentTab == 'followings' }
                  activitiesHandler={ this.activitiesHandler }
                  onLoad={ onLoad.bind(this, 'followings') } />

              <PersonsPopup_FollowersPanel
                  isActive={ this.state.currentTab == 'followers' }
                  activitiesHandler={ this.activitiesHandler }
                  onLoad={ onLoad.bind(this, 'followers') } />

              { requestsPanel }

              <PersonsPopup_IgnoredPanel
                  isActive={ this.state.currentTab == 'ignored' }
                  activitiesHandler={ this.activitiesHandler }
                  onLoad={ onLoad.bind(this, 'ignored') } />

            </Popup>`

# Temporarily exclude guesses tab
# <PersonsPopup_GuessesPanel isActive={ this.state.currentTab == 'guesses' }
#                            total_count={ this.state.relationships.guesses.total_count }
#                            activitiesHandler={ this.activitiesHandler }
#                            onLoad={ onLoad.bind(this, 'guesses') } />

  isProfilePrivate: -> @state.user.is_privacy is true

  selectTab: (type) -> @setState(currentTab: type)

  getStateFromStores: ->
    user:          CurrentUserStore.getUser()
    relationships: RelationshipsStore.getRelationships()

#   updateRelationships: (type, action, relationships) ->
#     newRelationships = @state.relationships
#     newRelationships[type].items ||= []

#     if action is 'update'
#       newRelationships[type] = relationships
#     else if action is 'add'
#       relationships.items = newRelationships[type].items.concat relationships.items
#       newRelationships[type] = relationships

#     @setState relationships: newRelationships

  onStoresChange: ->
    @setState @getStateFromStores()