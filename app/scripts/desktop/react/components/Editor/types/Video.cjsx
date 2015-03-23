EditorStore = require '../../../stores/editor'
ConnectStoreMixin = require '../../../../../shared/react/mixins/connectStore'
EditorTextField = require '../fields/Text'
EditorEmbed = require '../Embed/Embed'
EditorTypeVideoWelcome = require './Video/Welcome'
{ PropTypes } = React

EditorTypeVideo = React.createClass
  displayName: 'EditorTypeVideo'
  mixins: [ConnectStoreMixin(EditorStore)]

  propTypes:
    entry: PropTypes.object.isRequired
    entryType: PropTypes.string.isRequired
    onFieldChange: PropTypes.func.isRequired

  render: ->
    <article className="post post--video post--edit">
      <div className="post__content">
        <EditorEmbed
            embedUrl={ @state.embedUrl }
            embedHtml={ @state.embedHtml }
            onCreate={ @handleCreateEmbed }
            onDelete={ @handleDeleteEmbed }>
          <EditorTypeVideoWelcome />
        </EditorEmbed>
        <EditorTextField
            mode="partial"
            text={ @state.title }
            placeholder={ i18n.t('editor_description_placeholder') }
            onChange={ @props.onFieldChange.bind(null, 'title') } />
      </div>
    </article>

  handleCreateEmbed: ({embedUrl, embedHtml}) ->
    @props.onFieldChange 'embedUrl', embedUrl
    @props.onFieldChange 'embedHtml', embedHtml

  handleDeleteEmbed: ->
    @props.onFieldChange 'embedUrl', null
    @props.onFieldChange 'embedHtml', null

  getStateFromStore: ->
    title: EditorStore.getEntryValue 'title'
    embedUrl: EditorStore.getEntryValue 'embedUrl'
    embedHtml: EditorStore.getEntryValue 'embedHtml'

module.exports = EditorTypeVideo