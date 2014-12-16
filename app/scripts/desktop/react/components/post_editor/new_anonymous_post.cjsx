window.PostEditor_NewAnonymousPost = React.createClass
  mixins: [PostEditor_LayoutMixin, 'ReactActivitiesMixin']

  getDefaultProps: ->
    tlogType:  'anonymous'

  getInitialState: ->
    normalizedEntry: EntryStore.restoreAnonymousEntry() || new NormalizedEntry({tlogType: 'anonymous'})
    entryType:       'anonymous'
    entryPrivacy:    'anonymous'