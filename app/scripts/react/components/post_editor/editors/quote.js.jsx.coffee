###* @jsx React.DOM ###

window.PostEditor_QuoteEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser', PostEditor_AutosaveMixin]

  propTypes:
    entryText:   React.PropTypes.string
    entrySource: React.PropTypes.string

  render: ->
   `<article className="post post--quote post--edit">
      <div className="post__content">
        <blockquote className="blockquote">
          <TastyEditor ref="textEditor"
                       placeholder="Текст цитаты (499 символов)"
                       mode="partial"
                       content={ this.props.entryText }
                       isLoading={ this.hasActivities() }
                       onChange={ this.startAutosave } />

          <div className="blockquote__caption">
            <span className="blockquote__dash">—</span>
            <TastyEditor ref="sourceEditor"
                         placeholder="Автор (не обязательно)"
                         content={ this.props.entrySource }
                         isLoading={ this.hasActivities() }
                         onChange={ this.startAutosave } />
          </div>
        </blockquote>
      </div>
    </article>`

  storeEntry: ->
    EntryStoreService.storeEntry @props.entryId, @props.entryUpdatedAt, @_getNormalizedData()

  _getNormalizedData: ->
    # Используется при сохранении данных в EntryStoreService
    return {
      text:  @refs.textEditor.content()
      title: @refs.sourceEditor.content()
    }

  _getEditorData: ->
    # Используется в ключе data, ajax-запроса
    return {
      text:   @refs.textEditor.content()
      source: @refs.sourceEditor.content()
    }

  handleChange: -> @storeEntry()