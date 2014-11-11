###* @jsx React.DOM ###

HIDDEN_STATE = 'hidden'
FORM_STATE   = 'form'
LINK_STATE   = 'link'

window.EntryCommentBox_CommentCreateFormManager = React.createClass
  mixins: [RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    entryId:            React.PropTypes.number.isRequired
    user:               React.PropTypes.object.isRequired
    isEntryPage:        React.PropTypes.bool
    totalCommentsCount: React.PropTypes.number.isRequired
    onCommentAdded:     React.PropTypes.func.isRequired

  getInitialState: ->
    currentState:  HIDDEN_STATE
    isPostLoading: false

  componentDidMount: ->
    window.commentsMediator.registerForm @

    if @isCurrentlyOpen()
      @setState currentState: FORM_STATE
    else if @props.totalCommentsCount == 0
      @setState currentState: HIDDEN_STATE
    else
      @setState currentState: LINK_STATE

  componentWillUnmount: -> window.commentsMediator.unregisterForm @

  render: ->
    switch @state.currentState
      when FORM_STATE   then form = `<EntryCommentBox_CommentForm ref="commentForm"
                                                                  user={ this.props.user }
                                                                  isLoading={ this.state.isPostLoading }
                                                                  onSubmit={ this.onSubmit }
                                                                  onCancel={ this.onCancel } />`
      when HIDDEN_STATE then form = `<div></div>`
      when LINK_STATE   then form = `<div className="comments__more">
                                       <a onClick={ this.onClick }
                                          className="comments__more-link">Прокомментировать</a>
                                     </div>`
      else console.warn 'Неизвестное состояние формы ввода комментария', @state.currentState

    form

  isCurrentlyOpen: -> @props.isEntryPage

  isClosed: -> @state.currentState != FORM_STATE

  openAndReply: (name) ->
    @openForm() if @isClosed()
    _.defer => @refs.commentForm.addReply name

  openForm: ->
    @setState currentState: FORM_STATE
    _.defer => @refs.commentForm.refs.commentFormField.getDOMNode().focus()

  closeForm: ->
    if @props.totalCommentsCount == 0
      @setState currentState: HIDDEN_STATE
    else
      @setState currentState: LINK_STATE

  clearForm: ->
    @refs.commentForm.refs.commentFormField.getDOMNode().value = ''

  onClick: ->
    window.commentsMediator.doCommentClicked @props.entryId

  onSubmit: (text) ->
    @setState isPostError: false, isPostLoading: true

    @createRequest
      url: ApiRoutes.comments_url()
      method: 'POST'
      data:
        entry_id: @props.entryId
        text:     text
      success: (comment) =>
        @props.onCommentAdded comment

        if @isCurrentlyOpen()
          @clearForm()
        else
          window.commentsMediator.doFormClosed @
      error: (data) =>
        @safeUpdateState isPostError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState isPostLoading: false

  onCancel: -> window.commentsMediator.doFormClosed()