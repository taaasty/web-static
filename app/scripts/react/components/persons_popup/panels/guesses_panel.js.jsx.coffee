###* @jsx React.DOM ###

window.PersonsPopup_GuessesPanel = React.createClass
  mixins:       [PersonsPopup_PanelMixin]
  relationUrl:  -> Routes.api.relationships_to_url 'guessed'
  itemClass:    PersonsPopup_GuessRelationship
