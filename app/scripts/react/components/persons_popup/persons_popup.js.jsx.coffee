###* @jsx React.DOM ###

PERSON_POPUP_TITLE = 'Управление подписками'

window.PersonsPopup = React.createClass
  mixins: [ReactUnmountMixin, 'ReactActivitiesMixin', RequesterMixin]

  getInitialState: ->
    relationships: {
      followings: {
        items:       null
        total_count: null
      }
      followers: {
        items:       null
        total_count: null
      }
      guesses: {
        items:       null
        total_count: null
      }
      ignores: {
        items:       null
        total_count: null
      }
    }
    currentTab: 'followings'

  render: ->
    onLoad = -> @updateRelationships.apply @, arguments

    return `<Popup hasActivities={this.hasActivities()}
                   title={PERSON_POPUP_TITLE}
                   isDraggable={ true }
                   onClose={this.unmount}
                   className='popup--persons'>

      <PersonsPopup_Menu relationships={ this.state.relationships }
                         currentTab={ this.state.currentTab }
                         onSelect={ this.selectTab }/>

      <PersonsPopup_FollowingsPanel isActive={ this.state.currentTab == 'followings' }
                                    relationships={ this.state.relationships.followings.items }
                                    total_count={ this.state.relationships.followings.total_count }
                                    activitiesHandler={ this.activitiesHandler }
                                    onLoad={ onLoad.bind(this, 'followings') } />

      <PersonsPopup_FollowersPanel isActive={ this.state.currentTab == 'followers' }
                                   relationships={ this.state.relationships.followers.items }
                                   total_count={ this.state.relationships.followers.total_count }
                                   activitiesHandler={ this.activitiesHandler }
                                   onLoad={ onLoad.bind(this, 'followers') } />

      <PersonsPopup_GuessesPanel isActive={ this.state.currentTab == 'guesses' }
                                 relationships={ this.state.relationships.guesses.items }
                                 total_count={ this.state.relationships.guesses.total_count }
                                 activitiesHandler={ this.activitiesHandler }
                                 onLoad={ onLoad.bind(this, 'guesses') } />

    </Popup>`
    # Временно закрыли эту плашку
    #<PersonsPopup_IgnoresPanel isActive={ this.state.currentTab == 'ignores' }
                               #relationships={ this.state.relationships.ignores.items }
                               #total_count={ this.state.relationships.ignores.total_count }
                               #activitiesHandler={ this.activitiesHandler }
                               #onLoad={ onLoad.bind(this, 'ignores') } />

  selectTab: (type) -> @setState currentTab: type

  updateRelationships: (type, action, relationships) ->
    newRelationships = @state.relationships
    newRelationships[type].items ||= []

    if action is 'update'
      newRelationships[type] = relationships
    else if action is 'add'
      relationships.items = newRelationships[type].items.concat relationships.items
      newRelationships[type] = relationships

    @setState relationships: newRelationships

module.exports = PersonsPopup
