###* @jsx React.DOM ###

window.PostEditor_TextEditor = React.createClass
  mixins:    [PostEditor_PersistenceMixin, ReactActivitiesUser]

  render: ->
    cx = React.addons.classSet post: true, 'post--text': true, 'post--edit': true, 'state--loading': @hasActivities()
    `<article className={cx}>
      <header className="post__header">
        <TastyEditor placeholder="Заголовок (199 символов)"
                     className='post__title'
                     ref="titleEditor"
                     content={this.props.entry.title}/>
      </header>
      <TastyEditor placeholder="Начните набирать текст поста.<br>Можно без заголовка, без картинки или без видео."
                   className='post__content'
                   ref="textEditor"
                   content={this.props.entry.text}
                   mode="rich"/>
    </article>`

  data: ->
    title: @refs.titleEditor.content()
    text:  @refs.textEditor.content()
