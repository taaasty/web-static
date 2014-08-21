CLOSED_STATE         = 'closed'
COMMENT_CREATE_STATE = 'commentCreateForm'
COMMENT_EDIT_STATE   = 'commentEditForm'

class window.CommentsMediator

  constructor: ->
    @_state = CLOSED_STATE
    @_forms = []
  
  setState: (newState) -> @_state = newState

  registerForm: (component) ->
    unless @_isFormRegistered component
      @setState(component) if component.isCurrentlyOpen?()

      @_forms.push component

  unregisterForm: (component) ->
    @_forms = _.without @_forms, component

  openAndReply: (entryId, name) ->
    form = @_getForm entryId
    form.openAndReply name
    @setState form

  openForm: (entryId, commentId) ->
    form = @_getForm entryId, commentId
    form.openForm()
    @setState form

  closeCurrentForm: ->
    @_state.closeForm?()
    @setState CLOSED_STATE

  doCommentClicked: (entryId) ->
    @closeCurrentForm() unless @_isFormOpened entryId
    @openForm entryId

  doReplyClicked: (entryId, name) ->
    @closeCurrentForm() unless @_isFormOpened entryId
    @openAndReply entryId, name  

  doEdit: (entryId, commentId) ->
    @closeCurrentForm() unless @_isFormOpened entryId, commentId
    @openForm entryId, commentId

  doFormClosed: ->
    @closeCurrentForm()
    @setState CLOSED_STATE

  _getForm: (entryId, commentId) ->
    if commentId?
      result = @_forms.filter (form) =>
        form.props.commentId == commentId
    else
      result = @_forms.filter (form) =>
        form.props.entryId == entryId

    result[0]

  _isFormRegistered: (component) ->
    if component.props.commentId?
      result = @_forms.filter (form) =>
        form.props.commentId == component.props.commentId
    else
      result = @_forms.filter (form) =>
        form.props.entryId == component.props.entryId

    result.length > 0

  _isFormOpened: (entryId, commentId) ->
    unless @_isClosed()
      @_state.props.entryId == entryId && @_state.props.commentId == commentId
    else
      false

  _isClosed: -> @_state == CLOSED_STATE

window.commentsMediator = new CommentsMediator()