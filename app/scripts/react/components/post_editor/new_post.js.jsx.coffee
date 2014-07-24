###* @jsx React.DOM ###

window.PostEditor_NewPost = React.createClass
  mixins:         [PostEditor_LayoutMixin, ReactActivitiesMixin]

  getInitialState: ->
    entryPrivacy: DEFAULT_POST_PRIVACY[@props.isTlogPrivate]
    entryType:    DEFAULT_POST_TYPE
    entry:        DEFAULT_ENTRIES[DEFAULT_POST_TYPE]

  changeType:     (type) -> @setState entryType: type, entry: DEFAULT_ENTRIES[type]


DEFAULT_POST_TYPE = 'text'
DEFAULT_POST_PRIVACY =
  false: 'public'
  true:  'private'

DEFAULT_ENTRIES =
  text:
    type: 'text'
    title: null
    text:  null
  image:
    type: 'text'
    type:             'image'
    title:             null
    image_url:         null
    image_attachments: []
  video:
    type: 'text'
    type:     'video'
    title:     null
    video_url: null
  quote:
    type: 'text'
    type:  'quote'
    text:   null
    source: null
