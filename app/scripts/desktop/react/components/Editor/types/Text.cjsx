EditorStore = require '../../../stores/EditorStore'
EditorActionCreators = require '../../../actions/editor'
ConnectStoreMixin = require '../../../../../shared/react/mixins/connectStore'
EditorTextField = require '../fields/Text'
{ PropTypes } = React

EditorTypeText = React.createClass
  displayName: 'EditorTypeText'
  mixins: [ConnectStoreMixin(EditorStore)]

  propTypes:
    entry: PropTypes.object.isRequired
    entryType: PropTypes.string.isRequired

  render: ->
    <article className="post post--text post--edit">
      <header className="post__header">
        <EditorTextField 
            text={ @state.title }
            placeholder={ i18n.t('editor_title_placeholder') }
            className="post__title"
            onChange={ @handleTitleChange } />
      </header>
      <EditorTextField
          mode="rich"
          text={ @state.text }
          placeholder={ i18n.t('editor_text_placeholder') }
          className="post__content"
          onChange={ @handleTextChange } />
    </article>

  handleTitleChange: (title) ->
    EditorActionCreators.changeTitle title

  handleTextChange: (text) ->
    EditorActionCreators.changeText text

  getStateFromStore: ->
    title: EditorStore.getEntryValue 'title'
    text: EditorStore.getEntryValue 'text'

module.exports = EditorTypeText