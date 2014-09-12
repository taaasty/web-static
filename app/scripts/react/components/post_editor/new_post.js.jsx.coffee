###* @jsx React.DOM ###

DEFAULT_POST_TYPE = 'text'

window.PostEditor_NewPost = React.createClass
  mixins: [PostEditor_LayoutMixin, 'ReactActivitiesMixin']

  getInitialState: ->
    # Может сделать зависимость от @props.tlogType ?
    normalizedEntry: EntryStore.restoreNewEntry() || new NormalizedEntry()
    entryType:       DEFAULT_POST_TYPE
    entryPrivacy:    if @props.tlogType is 'public' then 'live' else 'public'

  changeType: (type) ->
    @setState entryType: type

  changePrivacy: (privacy) ->
    @setState entryPrivacy: privacy