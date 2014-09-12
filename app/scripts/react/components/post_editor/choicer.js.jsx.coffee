###* @jsx React.DOM ###

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

window.PostEditor_Choicer = React.createClass

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
      choicesItems = CHOICER_TYPES.map (type) => @getItemForType type
    else
      choicesItems = @getItemForType @props.currentType

    return `<nav className={ choicerClasses }>{ choicesItems }</nav>`

  getItemForType: (type) ->
    onSelect = (type) =>
      TastyEvents.trigger TastyEvents.keys.command_current_notification_hide()

      @props.onChangeType?(type)

    choicerItemData = CHOICER_ITEMS[type]

    PostEditor_ChoicerItem
      title:     choicerItemData.title
      icon:      choicerItemData.icon
      isActive:  @props.currentType == type
      isLoading: @props.isLoading
      onClick:   onSelect.bind(@, type)
      key:       type

window.PostEditor_ChoicerItem = React.createClass

  propTypes:
    title:     React.PropTypes.string.isRequired
    icon:      React.PropTypes.string.isRequired
    isActive:  React.PropTypes.bool
    isLoading: React.PropTypes.bool.isRequired
    onClick:   React.PropTypes.func.isRequired

  componentDidMount: ->
    @$button = $( @getDOMNode() )

    @$button.tooltip()

  componentWillUnmount: ->
    @$button.tooltip 'destroy'

  render: ->
    choicerItemClasses = React.addons.classSet {
      'button': true
      'button--circle': true
      'state--disable': @props.isLoading
      'state--active' : @props.isActive
    }

    return `<button data-original-title={ this.props.title }
                    className={ choicerItemClasses }
                    onClick={ this.handleClick }>
              <i className={ "icon " + this.props.icon } />
            </button>`

  handleClick: ->
    @props.onClick() unless @props.isLoading