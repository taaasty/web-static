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
      @setState(component) if component.isCurrentlyOpen()

      @_forms.push component

  unregisterForm: (component) ->
    @_forms = _.without @_forms, component

  openAndReply: (entryId, name) ->
    form = @_getForm entryId
    form.openAndReply name
    @setState form

  openForm: (entryId) ->
    form = @_getForm entryId
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

  doEdit: ->

  doFormClosed: (component) ->
    component.closeForm()
    @setState CLOSED_STATE

  _getForm: (entryId) ->
    result = @_forms.filter (form) =>
      form.props.entryId == entryId

    result[0]

  _isFormRegistered: (component) ->
    result = @_forms.filter (form) =>
      form.props.entryId == component.props.entryId

    result.length > 0

  _isFormOpened: (entryId) ->
    if @_isClosed() then false else @_state.props.entryId == entryId

  _isClosed: -> @_state == CLOSED_STATE

window.commentsMediator = new CommentsMediator()