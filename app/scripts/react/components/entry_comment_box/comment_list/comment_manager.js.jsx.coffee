###* @jsx React.DOM ###

window.EntryCommentBox_CommentManager = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    comment:   React.PropTypes.object.isRequired
    commentId: React.PropTypes.number.isRequired
    entryId:   React.PropTypes.number.isRequired
    entryUrl:  React.PropTypes.string.isRequired
    isShared:  React.PropTypes.bool
    onDelete:  React.PropTypes.func

  getInitialState: ->
    comment: @props.comment
    isEdit: false

  componentDidMount: ->
    window.commentsMediator.registerForm @

  componentWillUnmount: ->
    window.commentsMediator.unregisterForm @

  render: ->
    if @state.isEdit
      comment = `<EntryCommentBox_CommentEditFormManager comment={ this.state.comment }
                                                         user={ this.state.comment.user }
                                                         onEditEnd={ this.onEditEnd }
                                                         onSubmit={ this.onSubmit }
                                                         isLoading={ this.state.isEditLoading }
                                                         onCancel={ this.onCancel } />`
    else
      commentClasses = React.addons.classSet {
        comment: true
        'state--highlighted': @props.isShared
      }

      comment = `<EntryCommentBox_Comment comment={ this.state.comment }
                                          entryId={ this.props.entryId }
                                          entryUrl={ this.props.entryUrl }
                                          isShared={ this.props.isShared }
                                          onEditStart={ this.onEditStart }
                                          onDelete={ this.props.onDelete } />`

      comment

  openForm:  -> @setState isEdit: true
  closeForm: -> @setState isEdit: false

  onCancel: -> window.commentsMediator.doFormClosed @

  onSubmit: (text) ->
    @setState isEditError: false, isEditLoading: true

    @createRequest
      url: Routes.api.comments_edit_delete_url @props.commentId
      method: 'PUT'
      data:
        text: text
      success: (comment) =>
        @safeUpdateState => @setState comment: comment
        window.commentsMediator.doFormClosed @
      error: (data) =>
        @safeUpdateState => @setState isEditError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isEditLoading: false