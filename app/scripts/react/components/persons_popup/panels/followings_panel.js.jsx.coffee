###* @jsx React.DOM ###

window.PersonsPopup_FollowingsPanel = React.createClass
  mixins: ['PersonsPopup_PanelMixin']

  relationUrl: -> ApiRoutes.relationships_to_url 'friend'
  itemClass: PersonsPopup_FollowingRelationship