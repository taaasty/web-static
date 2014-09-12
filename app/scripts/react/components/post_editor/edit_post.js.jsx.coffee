###* @jsx React.DOM ###

window.PostEditor_EditPost = React.createClass
  mixins: ['ReactActivitiesMixin', PostEditor_LayoutMixin]

  propTypes:
    entry: React.PropTypes.object.isRequired

  getInitialState: ->
    @stateFromProps @props

  componentWillReceiveProps: (nextProps) ->
    @setState @stateFromProps(nextProps)

  stateFromProps: (props) ->
    normalizedEntry:
      EntryStore.restoreExistenEntry( @props.entry.id, @props.entry.updated_at ) ||
      EntryNormalizer.normalize( @props.entry )
    entryType:    @props.entry?.type    || 'text'
    entryPrivacy: @props.entry?.privacy || 'public'

  changePrivacy: (privacy) ->
    @setState entryPrivacy: privacy