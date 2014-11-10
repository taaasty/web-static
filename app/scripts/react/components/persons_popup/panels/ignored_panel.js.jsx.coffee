###* @jsx React.DOM ###

window.PersonsPopup_IgnoredPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationshipType: 'ignored'
  itemClass: PersonsPopup_IgnoredRelationship

  relationUrl: ->
    ApiRoutes.relationships_to_url 'ignored'

  getStateFromStore: ->
    relationships: RelationshipsStore.getIgnored()
    totalCount:    RelationshipsStore.getIgnoredTotalCount()