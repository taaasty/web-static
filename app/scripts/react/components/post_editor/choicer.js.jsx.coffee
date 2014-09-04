###* @jsx React.DOM ###

POST_TYPE_MUSIC = 'music'
POST_TYPE_VIDEO = 'video'
POST_TYPE_QUOTE = 'quote'
POST_TYPE_IMAGE = 'image'
POST_TYPE_IMAGE = 'instagram'
POST_TYPE_TEXT  = 'text'

CHOICER_TYPES = ['text', 'image', 'instagram', 'music', 'video','quote']
CHOICER_ITEMS =
  text:
    title: 'Текст'
    icon:  'icon--text-circle'
  image:
    title: 'Картинка'
    icon:  'icon--image-circle'
  instagram:
    title: 'Instagram'
    icon:  'icon--instagram-circle'
  music:
    title: 'Музыка'
    icon:  'icon--music-circle'
  video:
    title: 'Видео'
    icon:  'icon--video-circle'
  quote:
    title: 'Цитата'
    icon:  'icon--quote-circle'
  anonymous:
    title: 'Анонимка'
    icon:  'icon--text-circle'

window.PostEditorChoicer = React.createClass
  propTypes:
    currentType:  React.PropTypes.string.isRequired
    onChangeType: React.PropTypes.func

  render: ->
    cx = React.addons.classSet 'nav-types': true, 'state--loading': !@props.currentType?

    if @props.onChangeType?
      items = CHOICER_TYPES.map (type) => @getItemForType type
    else
      items = @getItemForType(@props.currentType)

    `<nav className={cx}>{items}</nav>`

  getItemForType: (type) ->
    onSelect = (type) => @props.onChangeType? type

    c = CHOICER_ITEMS[type]
    PostEditorChoicerItem
      key:      type
      title:    c.title
      icon:     c.icon
      onClick:  onSelect.bind(@,type)
      isActive: @props.currentType==type

window.PostEditorChoicerItem = React.createClass
  propTypes:
    title:    React.PropTypes.string.isRequired
    icon:     React.PropTypes.string.isRequired
    onClick:  React.PropTypes.func.isRequired
    isActive: React.PropTypes.bool

  render: ->
    cx = React.addons.classSet button: true, 'button--circle': true, 'state--active': @props.isActive
    `<button onClick={this.props.onClick} className={cx} title={this.props.title}>
        <i className={"icon " + this.props.icon}></i>
      </button>`
