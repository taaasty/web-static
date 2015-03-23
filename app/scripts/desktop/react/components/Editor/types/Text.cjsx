EditorStore = require '../../../stores/editor'
ConnectStoreMixin = require '../../../../../shared/react/mixins/connectStore'
EditorTextField = require '../fields/Text'
{ PropTypes } = React

EditorTypeText = React.createClass
  displayName: 'EditorTypeText'
  mixins: [ConnectStoreMixin(EditorStore)]

  propTypes:
    entry: PropTypes.object.isRequired
    entryType: PropTypes.string.isRequired
    onFieldChange: PropTypes.func.isRequired

  render: ->
    <article className="post post--text post--edit">
      <header className="post__header">
        <EditorTextField 
            text={ @state.title }
            placeholder={ i18n.t('editor_title_placeholder') }
            className="post__title"
            onChange={ @props.onFieldChange.bind(null, 'title') } />
      </header>
      <EditorTextField
          mode="rich"
          text={ @state.text }
          placeholder={ i18n.t('editor_text_placeholder') }
          className="post__content"
          onChange={ @props.onFieldChange.bind(null, 'text') } />
    </article>

  getStateFromStore: ->
    title: EditorStore.getEntryValue 'title'
    text: EditorStore.getEntryValue 'text'

module.exports = EditorTypeText