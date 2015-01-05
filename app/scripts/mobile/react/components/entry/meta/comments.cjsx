CommentsStore     = require '../../../stores/comments'
ConnectStoreMixin = require '../../../mixins/connectStore'
{ PropTypes } = React

EntryMetaComments = React.createClass
  displayName: 'EntryMetaComments'
  mixins: [ConnectStoreMixin(CommentsStore)]

  propTypes:
    entryId:       PropTypes.number.isRequired
    commentsCount: PropTypes.number.isRequired

  render: ->
    <div className="meta-comments">
      { @state.commentsCount }
    </div>

  getStateFromStore: ->
    { entryId, commentsCount } = @props

    commentsCount: CommentsStore.getTotalCount(entryId) || commentsCount

module.exports = EntryMetaComments