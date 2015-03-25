classSet = require 'react/lib/cx'
EditorActionCreators = require '../../../actions/editor'
EditorVoteButton = require '../buttons/Vote'
EditorPrivacyButton = require '../buttons/Privacy'
EditorPreviewButton = require '../buttons/Preview'
EditorSaveButton = require '../buttons/Save'
{ PropTypes } = React

ENTRY_PRIVACY_PRIVATE   = TLOG_TYPE_PRIVATE   = 'private'
ENTRY_PRIVACY_PUBLIC    = TLOG_TYPE_PUBLIC    = 'public'
ENTRY_PRIVACY_ANONYMOUS = TLOG_TYPE_ANONYMOUS = 'anonymous'
ENTRY_PRIVACY_LIVE = 'live'

EditorActions = React.createClass
  displayName: 'EditorActions'

  propTypes:
    entryPrivacy: PropTypes.string.isRequired
    tlogType: PropTypes.string.isRequired
    loading: PropTypes.bool.isRequired

  getInitialState: ->
    preview: false

  componentWillUpdate: (nextProps, nextState) ->
    #TODO: Применятор для показа превью
    if @state.preview isnt nextState.preview
      if nextState.preview
        $("body")
          .removeClass 'tlog-mode-minimal'
          .addClass 'tlog-mode-full'
      else
        $("body")
          .removeClass 'tlog-mode-full'
          .addClass 'tlog-mode-minimal'

  render: ->
    actionsClasses = classSet
      'post-actions': true
      'state--loading': @props.loading

    <div className={ actionsClasses }>
      { @renderSpinner() }
      { @renderVoteButton() }
      { @renderPrivacyButton() }
      <div className="post-action post-action--button">
        <EditorPreviewButton onClick={ @togglePreview } />
      </div>
      <div className="post-action post-action--button">
        <div className="button-group">
          <EditorSaveButton
              private={ @isEntryPrivate() }
              onClick={ @saveEntry } />
        </div>
      </div>
    </div>

  renderVoteButton: ->
    unless @isTlogAnonymous() or @isEntryPrivate() or @isTlogPrivate()
      <div className="post-action post-action--button">
        <EditorVoteButton
            enabled={ @isEntryLive() }
            onClick={ @handleVoteButtonClick } />
      </div>

  renderPrivacyButton: ->
    unless @isTlogAnonymous()
      <div className="post-action post-action--button">
        <EditorPrivacyButton
            live={ @isEntryLive() }
            private={ @isEntryPrivate() }
            onClick={ @handlePrivacyButtonClick } />
      </div>

  renderSpinner: ->
    if @props.loading
      <div className="post-action post-action--loader">
        <Spinner size={ 8 } />
      </div>

  isEntryLive: -> @props.entryPrivacy is ENTRY_PRIVACY_LIVE
  isEntryPublic: -> @props.entryPrivacy is ENTRY_PRIVACY_PUBLIC
  isEntryPrivate: -> @props.entryPrivacy is ENTRY_PRIVACY_PRIVATE

  isTlogPublic: -> @props.tlogType is TLOG_TYPE_PUBLIC
  isTlogPrivate: -> @props.tlogType is TLOG_TYPE_PRIVATE
  isTlogAnonymous: -> @props.tlogType is TLOG_TYPE_ANONYMOUS

  togglePreview: ->
    @setState(preview: !@state.preview)

  changePrivacy: (privacy) ->
    EditorActionCreators.changeEntryPrivacy privacy

  saveEntry: ->
    EditorActionCreators.saveEntry()

  handleVoteButtonClick: ->
    newEntryPrivacy = if @isEntryLive() then ENTRY_PRIVACY_PUBLIC else ENTRY_PRIVACY_LIVE
    @changePrivacy newEntryPrivacy

  handlePrivacyButtonClick: ->
    newEntryPrivacy = if @isEntryPrivate() then ENTRY_PRIVACY_PUBLIC else ENTRY_PRIVACY_PRIVATE
    @changePrivacy newEntryPrivacy    

module.exports = EditorActions