###* @jsx React.DOM ###

window.EntryCommentBox_CommentEditFormManager = React.createClass

  propTypes:
    comment:   React.PropTypes.object.isRequired
    user:      React.PropTypes.object.isRequired
    disabled:  React.PropTypes.bool
    isLoading: React.PropTypes.bool
    onSubmit:  React.PropTypes.func.isRequired
    onCancel:  React.PropTypes.func.isRequired

  render: ->
    `<EntryCommentBox_CommentForm ref="commentForm"
                                  text={ this.props.comment.comment_html }
                                  user={ this.props.user }
                                  disabled={ this.props.disabled }
                                  isLoading={ this.props.isLoading }
                                  onSubmit={ this.props.onSubmit }
                                  onCancel={ this.props.onCancel } />`