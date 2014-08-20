###* @jsx React.DOM ###

HIDDEN_STATE = 'hidden'
FORM_STATE   = 'form'
LINK_STATE   = 'link'

window.EntryCommentBox_CommentCreateFormManager = React.createClass

  propTypes:
    entryId:            React.PropTypes.number.isRequired
    user:               React.PropTypes.object.isRequired
    isEntryPage:        React.PropTypes.bool
    disabled:           React.PropTypes.bool
    totalCommentsCount: React.PropTypes.number.isRequired
    onSubmit:           React.PropTypes.func.isRequired

  getDefaultProps: ->
    disabled: false

  getInitialState: ->
    currentState: HIDDEN_STATE

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
                                                                  entryId={ this.props.entryId }
                                                                  user={ this.props.user }
                                                                  disabled={ this.props.disabled }
                                                                  onSubmit={ this.onSubmit }
                                                                  onCancel={ this.onCancel } />`
      when HIDDEN_STATE then form = `<div></div>`
      when LINK_STATE   then form = `<div className="comments_more">
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

  onClick: ->
    window.commentsMediator.doCommentClicked @props.entryId

  onSubmit: (text) ->
    @props.onSubmit text
    window.commentsMediator.doFormClosed @

  onCancel: -> window.commentsMediator.doFormClosed @    