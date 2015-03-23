EditorStore = require '../../../stores/editor'
ConnectStoreMixin = require '../../../../../shared/react/mixins/connectStore'
EditorTextField = require '../fields/Text'
{ PropTypes } = React

EditorTypeQuote = React.createClass
  displayName: 'EditorTypeQuote'
  mixins: [ConnectStoreMixin(EditorStore)]

  propTypes:
    entry: PropTypes.object.isRequired
    entryType: PropTypes.string.isRequired
    onFieldChange: PropTypes.func.isRequired

  render: ->
    <article className="post post--quote post--edit">
      <div className="post__content">
        <blockquote className="blockquote">
          <EditorTextField 
              text={ @state.text }
              placeholder={ i18n.t('editor_quote_text_placeholder') }
              onChange={ @props.onFieldChange.bind(null, 'text') } />
          <div className="blockquote__caption">
            <span className="blockquote__dash">—</span>  
            <EditorTextField
                text={ @state.source }
                placeholder={ i18n.t('editor_quote_source_placeholder') }
                onChange={ @props.onFieldChange.bind(null, 'source') } />
          </div>
        </blockquote>
      </div>
    </article>

  getStateFromStore: ->
    text: EditorStore.getEntryValue 'text'
    source: EditorStore.getEntryValue 'source'

module.exports = EditorTypeQuote