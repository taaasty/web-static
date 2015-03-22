EditorStore = require '../../stores/editor'
EditorActions = require '../../actions/editor'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'
Editor = require './Editor'
{ PropTypes } = React

EditorEdit = React.createClass
  displayName: 'EditorEdit'
  mixins: [ConnectStoreMixin(EditorStore)]

  propTypes:
    entry: PropTypes.object.isRequired
    tlogType: PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired
    backUrl: PropTypes.string

  componentWillMount: ->
    { entry, tlogType } = @props
    EditorActions.init {entry, tlogType}

  render: ->
    <Editor {...@state}
        tlogType={ @props.tlogType }
        backUrl={ @props.backUrl }
        canChangeType={ false } />

  getStateFromStore: ->
    entry: EditorStore.getEntry()
    entryType: EditorStore.getEntryType()
    entryPrivacy: EditorStore.getEntryPrivacy()

module.exports = EditorEdit