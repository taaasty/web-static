###* @jsx React.DOM ###

POST_TYPE_VIDEO='video'
POST_TYPE_QUOTE='quote'
POST_TYPE_IMAGE='image'
POST_TYPE_TEXT='text'

window.PostEditorChoicer = React.createClass
  propTypes:
    currentType:  React.PropTypes.string.isRequired
    onChangeType: React.PropTypes.func.isRequired

  render: ->
    onSelect = (type) => @props.onChangeType type
    cx = React.addons.classSet 'nav-types': true, 'state--loading': !@props.currentType?

    `<nav className={cx}>
      <PostEditorChoicerItem title="Текст" icon='icon--text-circle'     
          onClick={onSelect.bind(this,POST_TYPE_TEXT)}
          isActive={this.props.currentType==POST_TYPE_TEXT} />

      <PostEditorChoicerItem title="Картинка" icon='icon--image-circle' 
          onClick={onSelect.bind(this,POST_TYPE_IMAGE)}
          isActive={this.props.currentType==POST_TYPE_IMAGE} />

      <PostEditorChoicerItem title="Видео" icon='icon--video-circle'    
          onClick={onSelect.bind(this,POST_TYPE_VIDEO)}
          isActive={this.props.currentType==POST_TYPE_VIDEO} />

      <PostEditorChoicerItem title="Цитата" icon='icon--quote-circle'
          onClick={onSelect.bind(this,POST_TYPE_QUOTE)}
          isActive={this.props.currentType==POST_TYPE_QUOTE} />
    </nav>`



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
