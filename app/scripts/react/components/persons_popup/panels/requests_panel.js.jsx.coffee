###* @jsx React.DOM ###

window.PersonsPopup_RequestsPanel = PersonsPopup_RequestsPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationUrl:  -> Routes.api.relationships_to_url 'requested'
  itemClass:    PersonsPopup_RequestRelationship

module.exports = PersonsPopup_RequestsPanel
