###* @jsx React.DOM ###

PERSON_POPUP_TITLE = 'Управление подписками'

window.PersonsPopup = React.createClass
  mixins: [ReactUnmountMixin, ReactActivitiesMixin, RequesterMixin]

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
                                    activitiesHandler={ this.activitiesHandler }
                                    onLoad={ onLoad.bind(this, 'followings') } />

      <PersonsPopup_FollowersPanel isActive={ this.state.currentTab == 'followers' }
                                   relationships={ this.state.relationships.followers.items }
                                   activitiesHandler={ this.activitiesHandler }
                                   onLoad={ onLoad.bind(this, 'followers') } />

      <PersonsPopup_GuessesPanel isActive={ this.state.currentTab == 'guesses' }
                                 relationships={ this.state.relationships.guesses.items }
                                 activitiesHandler={ this.activitiesHandler }
                                 onLoad={ onLoad.bind(this, 'guesses') } />

      <PersonsPopup_IgnoresPanel isActive={ this.state.currentTab == 'ignores' }
                                 relationships={ this.state.relationships.ignores.items }
                                 activitiesHandler={ this.activitiesHandler }
                                 onLoad={ onLoad.bind(this, 'ignores') } />
    </Popup>`

  selectTab: (type) -> @setState currentTab: type

  updateRelationships: (type, relationships) ->
    newRelationships = this.state.relationships
    newRelationships[type] = relationships
    @setState relationships: newRelationships

module.exports = PersonsPopup