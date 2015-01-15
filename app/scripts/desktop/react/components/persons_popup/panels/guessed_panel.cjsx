window.PersonsPopup_GuessedPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationshipType: 'guessed'
  itemClass: -> PersonsPopup_GuessRelationship

  relationUrl: ->
    ApiRoutes.relationships_to_url 'guessed'

  getStateFromStore: ->
    relationships: RelationshipsStore.getGuessed()
    totalCount:    RelationshipsStore.getGuessedTotalCount()