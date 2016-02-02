autosize = require 'autosize'
REPLIES_LIMIT = 5

window.EntryCommentBox_CommentForm = React.createClass

  propTypes:
    user:      React.PropTypes.object.isRequired
    text:      React.PropTypes.string
    onSubmit:  React.PropTypes.func.isRequired
    onCancel:  React.PropTypes.func.isRequired
    isLoading: React.PropTypes.bool

  getInitialState: ->
    visibleSubmit: (@props.text? && typeof @props.text isnt "undefined" && @props.text isnt "")

  getDefaultProps: -> disabled: false

  componentDidMount: ->
    field = @refs.commentFormField
    autosize(field, {append: ''})

  componentDidUpdate: ->
    field = @refs.commentFormField
    evt = document.createEvent('Event')
    evt.initEvent('autosize:update', true, false)
    field.dispatchEvent(evt)

  componentWillUnmount: ->
    field = @refs.commentFormField
    evt = document.createEvent('Event')
    evt.initEvent('autosize:destroy', true, false)
    field.dispatchEvent(evt)

  render: ->
    if @props.isLoading
      avatar = <span className="spinner spinner--31x31"><span className="spinner__icon"></span></span>
    else
      avatar = <UserAvatar user={ this.props.user } size={ 64 } />

    return <div className="comment-form">
             <div className="comment-form__table">
               <div className="comment-form__table-cell">
                 <form>
                   <span className="comment-form__avatar">{ avatar }</span>
                   <EntryCommentBox_CommentFormSubmit visible={ this.state.visibleSubmit }
                                                      onClick={ this.onSubmit } />
                   <span className="comment-form__field">
                     <textarea ref="commentFormField"
                               placeholder={ i18n.t('comment_form_placeholder') }
                               defaultValue={ this.props.text }
                               disabled={ this.props.isLoading }
                               className="comment-form__field-textarea"
                               onFocus={ this.onFocus }
                               onBlur={ this.onBlur }
                               onKeyDown={ this.onKeyDown } />
                   </span>
                 </form>
               </div>
             </div>
           </div>

  getValue: -> @refs.commentFormField.value

  isEmpty: -> @getValue().trim() is ''

  addReply: (name) ->
    name    = '@' + name
    postfix = if /^@/.exec @getValue() then ', ' else ' '
    newText = @getValue()
    replies = @_getReplies()

    newText = @_removeLastReply() if replies.length > REPLIES_LIMIT
    newText = name + postfix + newText unless RegExp(name).exec newText

    field = @refs.commentFormField
    field.value = newText
    field.focus()

  _getReplies: ->
    replies = []
    text    = @getValue()
    regExp  = /@[^, ]{1,}/g

    replies = ( found[0] while found = regExp.exec(text) )

  _removeLastReply: ->
    text   = @getValue()
    regExp = /, @\w+(?=\s)/g

    text.replace regExp, ''

  _submitComment: ->
    @props.onSubmit @getValue()

  onFocus: ->
    # После фокуса, переводим курсор в конец строки
    field = @refs.commentFormField
    valueLength = field.value.length

    if field.setSelectionRange != undefined
      field.setSelectionRange valueLength, valueLength
    else
      field.value = field.value

    @setState visibleSubmit: true

  onBlur: ->
    @setState visibleSubmit: !@isEmpty()

  onKeyDown: (e) ->
    # Нажат Enter, введёный текст содержит какие-то символы, без Shift, Ctrl и Alt
    if e.which == 13 && @getValue().match(/./) && !e.shiftKey && !e.ctrlKey && !e.altKey
      e.preventDefault()
      @_submitComment()

    # Нажат Esc
    @props.onCancel() if e.which == 27

  onSubmit: (e) ->
    e.preventDefault()
    @_submitComment()