###* @jsx React.DOM ###

HIDDEN_STATE  = 'hidden'
FORM_STATE    = 'form'
LINK_STATE    = 'link'

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
    window.commentsMediator.registerCreateForm @props.entryId

    if @props.isEntryPage
      @setState currentState: FORM_STATE
      window.commentsMediator.openCreateForm @props.entryId
    else if @props.totalCommentsCount == 0
      @setState currentState: HIDDEN_STATE
    else
      @setState currentState: LINK_STATE

    TastyEvents.on "mediator_comments:#{ @props.entryId }:close", @closeForm
    TastyEvents.on "mediator_comments:#{ @props.entryId }:open", @openForm

  render: ->
    switch @state.currentState
      when FORM_STATE   then form = `<EntryCommentBox_CommentForm ref="commentForm"
                                                                  entryId={ this.props.entryId }
                                                                  user={ this.props.user }
                                                                  disabled={ this.props.disabled }
                                                                  onSubmit={ this.onSubmit } />`
      when HIDDEN_STATE then form = `<div></div>`
      when LINK_STATE   then form = `<div className="comments_more">
                                       <a onClick={ this.openForm }
                                          className="comments__more-link">Прокомментировать</a>
                                     </div>`
      else console.warn 'Неизвестное состояние формы ввода комментария', @state.currentState

    form

  openForm: ->
    console.log 'open'
    @setState currentState: FORM_STATE
    @refs.commentForm?.refs.commentFormField.getDOMNode().focus()

  closeForm: ->
    if @props.totalCommentsCount == 0
      @setState currentState: HIDDEN_STATE
    else
      @setState currentState: LINK_STATE

  onSubmit: ->
    # @props.onSubmit @state.text
    console.log 'создаём коммент'