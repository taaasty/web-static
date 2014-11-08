###* @jsx React.DOM ###

window.PersonsPopup_FollowersPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationUrl: -> ApiRoutes.relationships_by_url 'friend'
  itemClass: PersonsPopup_FollowerRelationship

  getStateFromStore: ->
    relationships: RelationshipsStore.getFollowers()