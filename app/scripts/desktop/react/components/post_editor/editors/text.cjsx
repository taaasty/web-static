cx = require 'react/lib/cx'

window.PostEditor_TextEditor = React.createClass
  mixins: ['PostEditor_PersistenceMixin', 'ReactActivitiesUser', PostEditor_AutosaveMixin]

  propTypes:
    normalizedEntry: React.PropTypes.instanceOf(NormalizedEntry).isRequired

  render: ->
    textEditorClasses = cx
      'post':           true
      'post--text':     true
      'post--edit':     true
      'state--loading': @hasActivities()

    return <article className={ textEditorClasses }>
             <header className="post__header">
               <TastyEditor ref="titleEditor"
                            content={ this.entryTitle() }
                            placeholder={ i18n.t('editor_title_placeholder') }
                            isLoading={ this.hasActivities() }
                            className="post__title"
                            autofocus={ true }
                            onChange={ this.startAutosave } />
             </header>
             <TastyEditor ref="textEditor"
                          mode="rich"
                          content={ this.entryText() }
                          placeholder={ i18n.t('editor_text_placeholder') }
                          isLoading={ this.hasActivities() }
                          className="post__content"
                          onChange={ this.startAutosave } />
           </article>

  entryTitle: -> @props.normalizedEntry.data1
  entryText:  -> @props.normalizedEntry.data2
  entryType:  -> 'text'

  _getNormalizedData: ->
    data1: @refs.titleEditor.content()
    data2: @refs.textEditor.content()

  _getEditorData: ->
    # Используется в ключе data, ajax-запроса
    return {
      title: @refs.titleEditor.content()
      text:  @refs.textEditor.content()
    }