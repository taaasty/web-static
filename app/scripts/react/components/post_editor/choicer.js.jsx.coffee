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
    isLoading:    React.PropTypes.bool.isRequired
    onChangeType: React.PropTypes.func

  render: ->
    choicerClasses = React.addons.classSet {
      'nav-types': true
      'state--loading': @props.isLoading
    }

    if @props.onChangeType?
      items = CHOICER_TYPES.map (type) => @getItemForType type
    else
      items = @getItemForType(@props.currentType)

    return `<nav className={ choicerClasses }>{ items }</nav>`

  getItemForType: (type) ->
    onSelect = (type) => @props.onChangeType?(type)

    choicerItemData = CHOICER_ITEMS[type]

    PostEditorChoicerItem
      title:     choicerItemData.title
      icon:      choicerItemData.icon
      isActive:  @props.currentType == type
      isLoading: @props.isLoading
      onClick:   onSelect.bind(@, type)
      key:       type

window.PostEditorChoicerItem = React.createClass

  propTypes:
    title:     React.PropTypes.string.isRequired
    icon:      React.PropTypes.string.isRequired
    isActive:  React.PropTypes.bool
    isLoading: React.PropTypes.bool.isRequired
    onClick:   React.PropTypes.func.isRequired

  render: ->
    choicerItemClasses = React.addons.classSet {
      'button': true
      'button--circle': true
      'state--disable': @props.isLoading
      'state--active': @props.isActive
    }

    return `<button title={ this.props.title }
                    className={ choicerItemClasses }
                    onClick={ this.onClick }>
              <i className={ "icon " + this.props.icon } />
            </button>`

  onClick: ->
    @props.onClick() unless @props.isLoading