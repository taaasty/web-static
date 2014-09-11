###* @jsx React.DOM ###

window.PostEditor_EditPost = React.createClass
  mixins: ['ReactActivitiesMixin', PostEditor_LayoutMixin]

  propTypes:
    entry:        React.PropTypes.object.isRequired
    onChangeType: React.PropTypes.func

  getInitialState: ->
    @stateFromProps @props

  componentWillReceiveProps: (nextProps) ->
    @setState @stateFromProps(nextProps)

  stateFromProps: (props) ->
    entry:        EntryStoreService.restoreEntry props.entry.type, props.entry, props.entry.id, props.entry.updated_at
    entryType:    props.entry?.type    || 'text'
    entryPrivacy: props.entry?.privacy || 'public'

  changePrivacy: (privacy) ->
    @setState entryPrivacy: privacy