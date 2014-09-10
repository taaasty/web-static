###* @jsx React.DOM ###

AUTOSAVE_TIME = 10000

window.PostEditor_TextEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser']

  propTypes:
    entryTitle: React.PropTypes.string
    entryText:  React.PropTypes.string

  componentDidMount: ->
    @autoSaveTimer = setInterval @storeEntry, AUTOSAVE_TIME

  componentWillUnmount: ->
    clearInterval(@autoSaveTimer) if @autoSaveTimer?

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
                             content={ this.props.entryTitle }
                             placeholder="Заголовок (199 символов)"
                             isLoading={ this.hasActivities() }
                             className="post__title" />
              </header>
              <TastyEditor ref="textEditor"
                           mode="rich"
                           content={ this.props.entryText }
                           placeholder="Начните набирать текст поста.<br>Shift + Enter новая строка, Enter – новый абзац"
                           isLoading={ this.hasActivities() }
                           className="post__content" />
            </article>`

  storeEntry: ->
    EntryStoreService.storeEntry @_getNormalizedData()

  _getNormalizedData: ->
    # Используется при сохранении данных в EntryStoreService
    return {
      type:  'text'
      title: @refs.titleEditor.content()
      text:  @refs.textEditor.content()
    }

  _getEditorData: ->
    # Используется в ключе data, ajax-запроса
    return {
      title: @refs.titleEditor.content()
      text:  @refs.textEditor.content()
    }

  handleChange: -> @storeEntry()