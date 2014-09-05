###* @jsx React.DOM ###

window.PostEditor_TextEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser']

  render: ->
    textEditorClasses = React.addons.classSet {
      'post':           true
      'post--text':     true
      'post--edit':     true
      'state--loading': @hasActivities()
    }

    return `<article className={ textEditorClasses }>
              <header className="post__header">
                <TastyEditor ref="titleEditor"
                             content={ this.props.entry.title }
                             placeholder="Заголовок (199 символов)"
                             isLoading={ this.hasActivities() }
                             className="post__title"
                             onChange={ this.getChangeCallback('title') } />
              </header>
              <TastyEditor ref="textEditor"
                           mode="rich"
                           content={ this.props.entry.text }
                           placeholder="Начните набирать текст поста.<br>SHIFT + ENTER новая строка, Enter – новый абзац"
                           isLoading={ this.hasActivities() }
                           className="post__content"
                           onChange={ this.getChangeCallback('text') } />
            </article>`

  data: ->
    title: @refs.titleEditor.content()
    text:  @refs.textEditor.content()