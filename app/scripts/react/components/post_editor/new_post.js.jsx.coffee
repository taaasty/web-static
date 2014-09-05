###* @jsx React.DOM ###

DEFAULT_POST_TYPE = 'text'

DEFAULT_ENTRIES =
  text:
    type: 'text'
    title: null
    text:  null
  image:
    type: 'image'
    title:     null
    image_url: null
    image_attachments: []
  instagram:
    type: 'video'
    title: null
  music:
    type: 'video'
    title: null
  video:
    type: 'video'
    title:     null
    video_url: null
  quote:
    type: 'quote'
    text:   null
    source: null

window.PostEditor_NewPost = React.createClass
  mixins: [PostEditor_LayoutMixin, 'ReactActivitiesMixin']

  getInitialState: ->
    # Может сделать зависимость от @props.tlogType ?
    entry:        DEFAULT_ENTRIES[DEFAULT_POST_TYPE]
    entryType:    DEFAULT_POST_TYPE
    entryPrivacy: if @props.tlogType is 'public' then 'live' else 'public'

  changeType: (type) ->
    @setState {
      entry:     DEFAULT_ENTRIES[type]
      entryType: type
    }

  changePrivacy: (privacy) ->
    @setState entryPrivacy: privacy