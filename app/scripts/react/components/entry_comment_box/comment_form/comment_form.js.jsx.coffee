###* @jsx React.DOM ###

REPLIES_LIMIT = 5

window.EntryCommentBox_CommentForm = React.createClass

  propTypes:
    user:          React.PropTypes.object.isRequired
    text:          React.PropTypes.string
    onSubmit:      React.PropTypes.func.isRequired
    onCancel:      React.PropTypes.func.isRequired
    isLoading:     React.PropTypes.bool

  getDefaultProps: ->
    disabled: false

  componentDidMount: -> @_initAutosize()

  componentDidUpdate: -> @$commentFormField.trigger 'autosize.resize'

  componentWillUnmount: -> @$commentFormField.trigger 'autosize.destroy'

  render: ->
    if @props.isLoading
      avatar = `<span className="spinner spinner--31x31"><span className="spinner__icon"></span></span>`
    else
      avatar = `<UserAvatar user={ this.props.user } size={ 64 } />`

    return `<div className="comment-form">
              <div className="comment-form__table">
                <div className="comment-form__table-cell">
                  <form>
                    <span className="comment-form__avatar">{ avatar }</span>
                    <span className="comment-form__field">
                      <i className="comment-form__field-bg" />
                      <textarea ref="commentFormField"
                                placeholder="Комментарий. SHIFT + ENTER новая строка"
                                defaultValue={ this.props.text }
                                disabled={ this.props.isLoading }
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

    @$commentFormField.val(newText).focus()

  _getReplies: ->
    replies = []
    text    = @$commentFormField.val()
    regExp  = /@[^, ]{1,}/g

    replies = ( found[0] while found = regExp.exec(text) )

  _removeLastReply: ->
    text   = @$commentFormField.val()
    regExp = /, @\w+(?=\s)/g

    text.replace regExp, ''

  onFocus: ->
    # После фокуса, переводим курсор в конец строки
    valueLength = @$commentFormField.val().length

    if @$commentFormField.get(0).setSelectionRange != undefined
      @$commentFormField.get(0).setSelectionRange valueLength, valueLength
    else
      @$commentFormField.val @$commentFormField.val()

  onKeyDown: (e) ->
    # Нажат Enter, введёный текст содержит какие-то символы, без Shift, Ctrl и Alt
    if e.which == 13 && @$commentFormField.val().match(/./) && !e.shiftKey && !e.ctrlKey && !e.altKey
      e.preventDefault()
      @props.onSubmit @$commentFormField.val()

    # Нажат Esc
    @props.onCancel() if e.which == 27

  _initAutosize: ->
    @$commentFormField = $( @refs.commentFormField.getDOMNode() )
    @$commentFormField.autosize append: ''