###* @jsx React.DOM ###

window.PersonsPopup_FollowingsPanel = React.createClass

  mixins:       [PersonsPopup_PanelMixin]
  relationUrl:  -> Routes.api.relationships_to_url 'friend'
  itemClass:    PersonsPopup_FollowingRelationship

module.exports = PersonsPopup_FollowingsPanel
