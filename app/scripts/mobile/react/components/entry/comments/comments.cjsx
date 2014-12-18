EntryComments_LoadMoreButton = require './buttons/load_more'
EntryComments_CommentList    = require './comment_list'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'EntryComments'

  propTypes:
    entryUrl:     PropTypes.string.isRequired
    commentsInfo: PropTypes.object.isRequired
    user:         PropTypes.object

  render: ->
    <div className="post__comments">
      <div className="comments">
        { @_getLoadMoreButton() }
        { @_getCommentList() }
        <form className="comment-form">
          <button className="comment-form__submit">Отпр</button>
          <div className="comment-form__field">
            <textarea className="comment-form__field-textarea" placeholder="Добавить комментарий" />
          </div>
        </form>
      </div>
    </div>

  _getLoadMoreButton: ->
    # if @state.totalCount > @state.comments.length
    <EntryComments_LoadMoreButton totalCount={ @props.commentsInfo.total_count } />

  _getCommentList: ->
    # if @state.comments.length > 0
    <EntryComments_CommentList
        comments={ @props.commentsInfo.comments }
        entryUrl={ @props.entryUrl } />