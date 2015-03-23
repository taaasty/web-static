EditorActionCreators = require '../../../actions/editor'
EditorTypeText = require '../types/Text'
EditorTypeImage = require '../types/Image'
EditorTypeInstagram = require '../types/Instagram'
EditorTypeMusic = require '../types/Music'
EditorTypeVideo = require '../types/Video'
EditorTypeQuote = require '../types/Quote'
{ PropTypes } = React

EditorContainer = React.createClass
  displayName: 'EditorContainer'

  propTypes:
    entry: PropTypes.object.isRequired
    entryType: PropTypes.string.isRequired
    entryPrivacy: PropTypes.string.isRequired

  render: ->
    <section className="posts posts--edit">
      { @renderEditor() }
    </section>

  renderEditor: ->
    props =
      entry: @props.entry
      entryType: @props.entryType
      onFieldChange: @updateField

    Component = switch @props.entryType
      when 'text', 'anonymous' then EditorTypeText
      when 'image' then EditorTypeImage
      when 'instagram' then EditorTypeInstagram
      when 'music' then EditorTypeMusic
      when 'video' then EditorTypeVideo
      when 'quote' then EditorTypeQuote
      else console.warn? 'Unknown type of normalized entry', @props.entryType

    return <Component {...props} />

  updateField: (key, value) ->
    EditorActionCreators.updateField {key, value}

#   saveEntry: ({ entryPrivacy }) ->
#     @refs.editor.saveEntry { entryPrivacy }

#   storeCallback: (normalizedEntry) ->
#     EntryStore.storeEntry normalizedEntry

#   redirectToEntryPage: (entry) ->
#     if TastySettings.env is 'static-development'
#       alert "Статья #{ entry.id } успешно сохранена"
#       window.location.reload()
#     else
#       _.defer =>
#         # TODO Выводить модалку
#         TastyNotifyController.notifySuccess i18n.t 'editor_create_success'
#         console.log 'goto', entry.entry_url
#         window.location.href = entry.entry_url

module.exports = EditorContainer