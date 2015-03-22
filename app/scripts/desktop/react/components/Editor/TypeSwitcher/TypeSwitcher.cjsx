_ = require 'lodash'
classSet = require 'react/lib/cx'
EditorTypeSwitcherItem = require './TypeSwitcherItem'
{ PropTypes } = React

AVAILABLE_TYPES = ['text', 'image', 'instagram', 'music', 'video', 'quote']
ENTRY_TYPES =
  text:
    title: -> i18n.t 'editor_text_type'
    icon: 'icon--text-circle'
  image:
    title: -> i18n.t 'editor_image_type'
    icon: 'icon--image-circle'
  instagram:
    title: -> i18n.t 'editor_instagram_type'
    icon: 'icon--instagram-circle'
  music:
    title: -> i18n.t 'editor_music_type'
    icon: 'icon--music-circle'
  video:
    title: -> i18n.t 'editor_video_type'
    icon: 'icon--video-circle'
  quote:
    title: -> i18n.t 'editor_quote_type'
    icon: 'icon--quote-circle'
  anonymous:
    title: -> i18n.t 'editor_anonymous_type'
    icon: 'icon--text-circle'

EditorTypeSwitcher = React.createClass
  displayName: 'EditorTypeSwitcher'

  propTypes:
    entryType: PropTypes.string.isRequired
    canChangeType: PropTypes.bool.isRequired
    loading: PropTypes.bool.isRequired

  render: ->
    switcherClasses = classSet
      'nav-types': true
      'state--loading': @props.loading

    return <nav className={ switcherClasses }>
             { @renderListItems() }
           </nav>

  renderListItems: ->
    if @props.canChangeType
      listItems = _.map AVAILABLE_TYPES, (type) =>
        <EditorTypeSwitcherItem
            title={ ENTRY_TYPES[type].title() }
            icon={ ENTRY_TYPES[type].icon }
            active={ @props.entryType is type }
            loading={ @props.loading }
            onClick={ @changeType.bind(null, type) }
            key={ type } />
    else
      <EditorTypeSwitcherItem
          title={ ENTRY_TYPES[@props.entryType].title() }
          icon={ ENTRY_TYPES[@props.entryType].icon }
          active={ true }
          loading={ @props.loading } />

  changeType: (name) ->
    console.log 'change entry type action', name

module.exports = EditorTypeSwitcher