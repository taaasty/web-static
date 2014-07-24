###* @jsx React.DOM ###

window.PostEditor_EditPost = React.createClass
  mixins:         [PostEditor_LayoutMixin, ReactActivitiesMixin]

  propTypes:
    entry:        React.PropTypes.object.isRequired
    onChangeType: React.PropTypes.func

  getInitialState: ->
    entryPrivacy: @props.entry.privacy
    entryType:    @props.entry.type
    entry:        @props.entry

  #changeType:     (type) -> alert "Can't change type of existen entry'
