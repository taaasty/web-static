window.PersonsPopup_RequestedPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationshipType: 'requested'
  itemClass: -> PersonsPopup_RequestedRelationship

  relationUrl: ->
    ApiRoutes.relationships_by_url 'requested'

  getStateFromStore: ->
    relationships: RelationshipsStore.getRequested()
    totalCount:    RelationshipsStore.getRequestedTotalCount()