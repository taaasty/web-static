###* @jsx React.DOM ###

AUTOSAVE_TIME = 10000

window.PostEditor_QuoteEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser']

  propTypes:
    entryText:   React.PropTypes.string
    entrySource: React.PropTypes.string

  componentDidMount: ->
    @autoSaveTimer = setInterval @storeEntry, AUTOSAVE_TIME

  componentWillUnmount: ->
    clearInterval(@autoSaveTimer) if @autoSaveTimer?

  render: ->
   `<article className="post post--quote post--edit">
      <div className="post__content">
        <blockquote className="blockquote">
          <TastyEditor ref="textEditor"
                       placeholder="Текст цитаты (499 символов)"
                       mode="partial"
                       content={ this.props.entryText }
                       isLoading={ this.hasActivities() } />

          <div className="blockquote__caption">
            <span className="blockquote__dash">—</span>
            <TastyEditor ref="sourceEditor"
                         placeholder="Автор (не обязательно)"
                         content={ this.props.entrySource }
                         isLoading={ this.hasActivities() } />
          </div>
        </blockquote>
      </div>
    </article>`

  storeEntry: ->
    EntryStoreService.storeEntry @_getNormalizedData(), @props.entryId

  _getNormalizedData: ->
    # Используется при сохранении данных в EntryStoreService
    return {
      type:   'quote'
      text:   @refs.textEditor.content()
      source: @refs.sourceEditor.content()
    }

  _getEditorData: ->
    # Используется в ключе data, ajax-запроса
    return {
      text:   @refs.textEditor.content()
      source: @refs.sourceEditor.content()
    }

  handleChange: -> @storeEntry()