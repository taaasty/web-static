###* @jsx React.DOM ###

window.PersonsPopup_IgnoresPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationUrl: -> Routes.api.relationships_to_url 'ignored'
  itemClass: PersonsPopup_IgnoredRelationship