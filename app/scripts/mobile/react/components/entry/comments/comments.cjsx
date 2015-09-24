CommentList       = require './commentList'
CommentCreateForm = require './commentForm/create'
CommentsLoadMore  = require './commentsLoadMore'
{ PropTypes } = React

EntryComments = React.createClass
  displayName: 'EntryComments'

  propTypes:
    user: PropTypes.object
    entry: PropTypes.object.isRequired
    comments: PropTypes.array.isRequired
    commentsCount: PropTypes.number.isRequired
    loading: PropTypes.bool.isRequired
    loadPerTime: PropTypes.number
    formFocus: PropTypes.bool.isRequired,
    formVisible: PropTypes.bool.isRequired
    onCommentsLoadMore: PropTypes.func.isRequired
    onCommentCreate: PropTypes.func.isRequired
    onCommentEdit: PropTypes.func.isRequired
    onCommentDelete: PropTypes.func.isRequired
    onCommentReport: PropTypes.func.isRequired

  render: ->
    <div className="post__comments">
      <div className="comments">
        { @renderLoadMore() }
        { @renderCommentList() }
        { @renderCommentForm() }
      </div>
    </div>

  renderLoadMore: ->
    if @props.commentsCount > @props.comments.length
      <CommentsLoadMore
          totalCount={ @props.commentsCount }
          loadedCount={ @props.comments.length }
          loading={ @props.loading }
          loadPerTime={ @props.loadPerTime }
          onCommentsLoadMore={ @props.onCommentsLoadMore } />

  renderCommentList: ->
    if @props.comments.length
      <CommentList
          comments={ @props.comments }
          entry={ @props.entry }
          onCommentEdit={ @props.onCommentEdit }
          onCommentDelete={ @props.onCommentDelete }
          onCommentReport={ @props.onCommentReport } />

  renderCommentForm: ->
    if @props.user? and @props.formVisible
      <CommentCreateForm
        formFocus={this.props.formFocus}
        entryId={ @props.entry.id }
        loading={ @props.loading }
        onCommentCreate={ @props.onCommentCreate }
      />

module.exports = EntryComments