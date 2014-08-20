###* @jsx React.DOM ###

REPLIES_LIMIT = 5

window.EntryCommentBox_CommentForm = React.createClass

  propTypes:
    user:      React.PropTypes.object.isRequired
    entryId:   React.PropTypes.number.isRequired
    text:      React.PropTypes.string
    disabled:  React.PropTypes.bool
    onSubmit:  React.PropTypes.func.isRequired

  getDefaultProps: ->
    disabled: false
    text:     ''

  componentDidMount: ->
    TastyEvents.on "mediator_comments:#{ @props.entryId }:reply", @addReply
    @_initAutosize()
    @refs.commentFormField.getDOMNode().focus()

  componentDidUpdate: -> @$commentFormField.trigger 'autosize.resize'

  componentWillUnmount: -> @$commentFormField.trigger 'autosize.destroy'

  render: ->
   `<div className="comment-form">
      <div className="comment-form__table">
        <div className="comment-form__table-cell">
          <form>
            <span className="comment-form__avatar">
              <UserAvatar user={ this.props.user }
                          size={ 64 } />
            </span>
            <span className="comment-form__field">
              <i className="comment-form__field-bg" />
              <textarea ref="commentFormField"
                        placeholder="Комментарий. SHIFT + ENTER новая строка"
                        defaultValue={ this.props.text }
                        disabled={ this.props.disabled }
                        className="comment-form__field-textarea"
                        onFocus={ this.onFocus }
                        onKeyDown={ this.onKeyDown } />
            </span>
          </form>
        </div>
      </div>
    </div>`

  addReply: (name) ->
    name    = '@' + name
    postfix = if /^@/.exec @$commentFormField.val() then ', ' else ' '
    newText = @$commentFormField.val()
    replies = @_getReplies()

    newText = @_removeLastReply() if replies.length > REPLIES_LIMIT
    newText = name + postfix + newText unless RegExp(name).exec newText

    @$commentFormField.val newText

  _getReplies: ->
    replies = []
    text    = @$commentFormField.val()
    regExp  = /@[^, ]{1,}/g

    replies = ( found[0] while found = regExp.exec(text) )

  _removeLastReply: ->
    text   = @$commentFormField.val()
    regExp = /, @\w+(?=\s)/g

    text.replace regExp, ''

  onFocus: (e) ->
    # После фокуса, переводим курсор в конец строки
    valueLength = e.target.value.length

    if e.target.setSelectionRange != undefined
      e.target.setSelectionRange valueLength, valueLength
    else
      @$commentFormField.val @$commentFormField.val()

  onKeyDown: (e) ->
    # Нажат Enter, введёный текст содержит какие-то символы, без Shift, Ctrl и Alt
    if e.which == 13 && e.target.value.match(/./) && !e.shiftKey && !e.ctrlKey && !e.altKey
      e.preventDefault()

      @props.onSubmit()

  _initAutosize: ->
    @$commentFormField = $( @refs.commentFormField.getDOMNode() )
    @$commentFormField.autosize append: ''