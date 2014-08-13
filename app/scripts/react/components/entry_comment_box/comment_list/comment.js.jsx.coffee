###* @jsx React.DOM ###

window.EntryCommentBox_Comment = React.createClass

  propTypes:
    comment: React.PropTypes.object.isRequired
    entryId: React.PropTypes.number.isRequired

  render: ->
   `<article className="comment">
      <div className="comment__table">
        <div className="comment__table-cell">
          <a className="comment__user" href={ this.props.comment.user.tlog_url } title={ this.props.comment.user.name }>
            <span className="comment__avatar">
              <UserAvatar user={ this.props.comment.user }
                          size={ 64 } />
            </span>
            <span className="comment__username comment__username--bold">{ this.props.comment.user.name }</span>
          </a>
          <span dangerouslySetInnerHTML={{ __html: this.props.comment.comment_html }} />
          <EntryCommentBox_CommentMetaBar comment={ this.props.comment }
                                          entryId={ this.props.entryId } />
        </div>
      </div>
    </article>`