###* @jsx React.DOM ###

window.PersonsPopup_FollowingsPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationshipType: 'followings'
  itemClass: PersonsPopup_FollowingRelationship

  relationUrl: ->
    ApiRoutes.relationships_to_url 'friend'

  getStateFromStore: ->
    relationships: RelationshipsStore.getFollowings()
    totalCount:    RelationshipsStore.getFollowingsTotalCount()