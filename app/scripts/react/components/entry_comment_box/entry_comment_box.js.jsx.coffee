###* @jsx React.DOM ###

window.EntryCommentBox = React.createClass

  propTypes:
    entryId: React.PropTypes.number.isRequired
    user:    React.PropTypes.object.isRequired

  render: ->
   `<section className="comments js-comments">
      <div style={{ display: 'none' }} className="comments__more js-comments-more">
        <a className="comments__more-link js-comments-more-link" title="Загрузить все 0 комментариев" href="">Загрузить все 0 комментариев</a>
      </div>
      <EntryCommentBox_CommentList entryId={ this.props.entryId } />
      <EntryCommentBox_CommentForm user={ this.props.user } />
    </section>`