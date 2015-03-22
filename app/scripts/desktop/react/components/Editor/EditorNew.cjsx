EditorStore = require '../../stores/editor'
EditorActions = require '../../actions/editor'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'
Editor = require './Editor'
{ PropTypes } = React

EditorNew = React.createClass
  displayName: 'EditorNew'
  mixins: [ConnectStoreMixin(EditorStore)]

  propTypes:
    tlogType: PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired
    backUrl: PropTypes.string

  componentWillMount: ->
    EditorActions.init
      entry: null
      tlogType: @props.tlogType

  render: ->
    <Editor {...@state}
        tlogType={ @props.tlogType }
        backUrl={ @props.backUrl }
        canChangeType={ true } />

  getStateFromStore: ->
    entry: EditorStore.getEntry()
    entryType: EditorStore.getEntryType()
    entryPrivacy: EditorStore.getEntryPrivacy()

module.exports = EditorNew