###* @jsx React.DOM ###

window.PostEditor_NewAnonymousPost = React.createClass
  mixins: [PostEditor_LayoutMixin, 'ReactActivitiesMixin']

  getDefaultProps: ->
    tlogType:  'anonymous'

  getInitialState: ->
    entryPrivacy: 'public'
    entryType:    'anonymous'
    entry:
      type: 'anonymous'
      title: null
      text: null
