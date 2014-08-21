###* @jsx React.DOM ###

window.EntryCommentBox_CommentEditFormManager = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    comment:   React.PropTypes.object.isRequired
    user:      React.PropTypes.object.isRequired
    disabled:  React.PropTypes.bool
    onEditEnd: React.PropTypes.func.isRequired
    onCancel:  React.PropTypes.func.isRequired

  getInitialState: ->
    isEditError:   false
    isEditLoading: false

  render: ->
    `<EntryCommentBox_CommentForm ref="commentForm"
                                  text={ this.props.comment.comment_html }
                                  user={ this.props.user }
                                  disabled={ this.props.disabled }
                                  isLoading={ this.state.isEditLoading }
                                  onSubmit={ this.onSubmit }
                                  onCancel={ this.props.onCancel } />`

  onSubmit: (text) ->
    @setState isEditError: false, isEditLoading: true

    @createRequest
      url: Routes.api.comments_edit_delete_url @props.comment.id
      method: 'PUT'
      data:
        text: text
      success: (comment) =>
        @props.onEditEnd comment
      error: (data) =>
        @safeUpdateState => @setState isEditError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isEditLoading: false