###* @jsx React.DOM ###

REPLIES_LIMIT = 5
HIDDEN_STATE  = 'hidden'
FORM_STATE    = 'form'
LINK_STATE    = 'link'

window.EntryCommentBox_CommentFormManager = React.createClass
  mixins: [RequesterMixin, React.addons.LinkedStateMixin]

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
    text:         ''
    currentState: HIDDEN_STATE

  componentDidMount: ->
    if @props.isEntryPage
      @setState currentState: FORM_STATE
    else if @props.totalCommentsCount == 0
      @setState currentState: HIDDEN_STATE
    else
      @setState currentState: LINK_STATE

    TastyEvents.on TastyEvents.keys.comment_form_toggled(), @toggleForm
    TastyEvents.on TastyEvents.keys.comment_replied(@props.entryId), @onCommentReplied

  componentWillUnmount: ->
    TastyEvents.off TastyEvents.keys.comment_form_toggled(), @toggleForm
    TastyEvents.off TastyEvents.keys.comment_replied(@props.entryId), @onCommentReplied

  render: ->
    textState = @linkState 'text'

    switch @state.currentState
      when FORM_STATE   then form = `<EntryCommentBox_CommentForm ref="commentForm"
                                                                  user={ this.props.user }
                                                                  disabled={ this.props.disabled }
                                                                  valueLink={ textState }
                                                                  onSubmit={ this.onSubmit } />`
      when HIDDEN_STATE then form = `<div></div>`
      when LINK_STATE   then form = `<div className="comments_more">
                                       <a onClick={ this.openForm }
                                          className="comments__more-link">Прокомментировать</a>
                                     </div>`
      else console.warn 'Неизвестное состояние формы ввода комментария', @state.currentState

    form

  openForm: ->
    @setState currentState: FORM_STATE
    @refs.commentForm?.refs.commentFormField.getDOMNode().focus()

  closeForm: ->
    if @props.totalCommentsCount == 0
      @setState currentState: HIDDEN_STATE
    else
      @setState currentState: LINK_STATE

  toggleForm: (entryId) ->
    # Если переключена текущая форма, то просто делаем переключение
    # Если переключена форма другого поста, то скрывам текущую форму
    if entryId == @props.entryId
      if @isOpen() then @closeForm() else @openForm()
    else
      @closeForm()

  onSubmit: ->
    @props.onSubmit @state.text
    @setState text: ''

  onCommentReplied: (name) ->
    name    = '@' + name
    postfix = if /^@/.exec @state.text then ', ' else ' '
    newText = @state.text
    replies = @_getReplies()

    @openForm()

    newText = @_removeLastReply() if replies.length > REPLIES_LIMIT
    newText = name + postfix + newText unless RegExp(name).exec newText

    @setState text: newText

  isOpen: -> @state.currentState == FORM_STATE

  _getReplies: ->
    replies = []
    text    = @state.text
    regExp  = /@[^, ]{1,}/g

    replies = ( found[0] while found = regExp.exec(text) )

  _removeLastReply: ->
    text   = @state.text
    regExp = /, @\w+(?=\s)/g

    text.replace regExp, ''