CLOSED_STATE         = 'closed'
COMMENT_CREATE_STATE = 'commentCreateForm'
COMMENT_EDIT_STATE   = 'commentEditForm'

class window.CommentsMediator

  constructor: ->
    @_state = CLOSED_STATE
    @_forms =
      edit:   []
      create: []
  
  setState: (newState) -> @_state = newState

  registerCreateForm: (entryId) ->
    unless @_isCreateFormRegistered entryId
      @_forms.create.push(entryId: entryId)

  registerEditForm: (entryId, commentId) ->
    # добавляем форму редактирования

  openCreateForm: (entryId) ->
    TastyEvents.trigger "mediator_comments:#{ entryId }:open"

    @setState {
      type:    COMMENT_CREATE_STATE
      entryId: entryId
    }

  closeCurrentForm: ->
    TastyEvents.trigger "mediator_comments:#{ @_state.entryId }:close"

    @setState CLOSED_STATE

  doCommentClicked: (entryId) ->
    unless @_isCreateFormOpened entryId
      @closeCurrentForm()
      @openCreateForm entryId
    else
      console.log 'Форма уже открыта'

  doReplyClicked: (entryId, name) ->
    @closeCurrentForm()
    @openCreateForm entryId
    TastyEvents.trigger "mediator_comments:#{ entryId }:reply", [name]

  doEdit: ->

  doFormClosed: ->

  _isCreateFormRegistered: (entryId) ->
    result = @_forms.create.filter (form) =>
      form.entryId == entryId

    result.length > 0

  _isCreateFormOpened: (entryId) ->
    @_state.type == COMMENT_CREATE_STATE && @_state.entryId == entryId

  _isClosed: -> @_state == CLOSED_STATE

window.commentsMediator = new CommentsMediator()