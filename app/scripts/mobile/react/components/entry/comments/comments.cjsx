EntryComments_LoadMoreButton = require './buttons/load_more'
EntryComments_CommentList    = require './comment_list'
EntryComments_CommentForm    = require './comment_form'
{ PropTypes } = React

#TODO: CommentsStore?

EntryComments = React.createClass
  displayName: 'EntryComments'

  propTypes:
    entryUrl:     PropTypes.string.isRequired
    commentsInfo: PropTypes.object.isRequired
    user:         PropTypes.object

  render: ->
    <div className="post__comments">
      <div className="comments">
        { @renderLoadMoreButton() }
        { @renderCommentList() }
        { @renderCommentForm() }
      </div>
    </div>

  renderLoadMoreButton: ->
    if @props.commentsInfo.total_count > @props.commentsInfo.comments.length
      <EntryComments_LoadMoreButton totalCount={ @props.commentsInfo.total_count } />

  renderCommentList: ->
    if @props.commentsInfo.comments.length
      <EntryComments_CommentList
          comments={ @props.commentsInfo.comments }
          entryUrl={ @props.entryUrl } />

  renderCommentForm: ->
    if @props.user?
      <EntryComments_CommentForm user={ @props.user } />

module.exports = EntryComments