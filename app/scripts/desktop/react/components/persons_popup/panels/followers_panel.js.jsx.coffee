###* @jsx React.DOM ###

window.PersonsPopup_FollowersPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationshipType: 'followers'
  itemClass: PersonsPopup_FollowerRelationship

  relationUrl: ->
    ApiRoutes.relationships_by_url 'friend'

  getStateFromStore: ->
    relationships: RelationshipsStore.getFollowers()
    totalCount:    RelationshipsStore.getFollowersTotalCount()