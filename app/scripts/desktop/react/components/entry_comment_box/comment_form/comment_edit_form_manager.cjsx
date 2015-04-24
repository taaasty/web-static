window.EntryCommentBox_CommentEditFormManager = React.createClass
  mixins: [RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    comment:   React.PropTypes.object.isRequired
    user:      React.PropTypes.object.isRequired
    onEditEnd: React.PropTypes.func.isRequired
    onCancel:  React.PropTypes.func.isRequired

  getInitialState: ->
    isEditError:   false
    isEditLoading: false

  render: ->
    <EntryCommentBox_CommentForm ref="commentForm"
                                 text={ this.props.comment.comment_html }
                                 user={ this.props.user }
                                 isLoading={ this.state.isEditLoading }
                                 onSubmit={ this.onSubmit }
                                 onCancel={ this.props.onCancel } />

  onSubmit: (text) ->
    @setState isEditError: false, isEditLoading: true

    @createRequest
      url: ApiRoutes.comments_edit_delete_url @props.comment.id
      method: 'POST'
      data:
        _method: 'PUT'
        text: text
      success: (comment) =>
        @props.onEditEnd comment
      error: (data) =>
        @safeUpdateState isEditError: true
        NoticeService.errorResponse data
      complete: =>
        @safeUpdateState isEditLoading: false