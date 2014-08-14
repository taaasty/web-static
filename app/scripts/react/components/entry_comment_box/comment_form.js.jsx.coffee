###* @jsx React.DOM ###

REPLIES_LIMIT = 5

window.EntryCommentBox_CommentForm = React.createClass
  mixins: [RequesterMixin, React.addons.LinkedStateMixin]

  propTypes:
    user:     React.PropTypes.object.isRequired
    disabled: React.PropTypes.bool
    onSubmit: React.PropTypes.func.isRequired

  getDefaultProps: ->
    disabled: false

  getInitialState: ->
    text: ''

  componentDidMount: ->
    TastyEvents.on TastyEvents.keys.comment_replied(@props.entryId), @onCommentReplied

    @$commentFormField = $( @refs.commentFormField.getDOMNode() )
    @$commentFormField.autosize append: ''

  componentDidUpdate: ->
    @$commentFormField.trigger 'autosize.resize'

  componentWillUnmount: ->
    @$commentFormField.trigger 'autosize.destroy'
    TastyEvents.off TastyEvents.keys.comment_replied(@props.entryId), @onCommentReplied

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
                        valueLink={ this.linkState('text') }
                        disabled={ this.props.disabled }
                        className="comment-form__field-textarea"
                        onKeyDown={ this.onKeyDown }
                        onBlur={ this.onBlur } />
            </span>
          </form>
        </div>
      </div>
    </div>`

  onCommentReplied: (name) ->
    name    = '@' + name
    postfix = if /^@/.exec @state.text then ', ' else ' '
    newText = @state.text
    replies = @_getReplies()

    newText = @_removeLastReply() if replies.length >= REPLIES_LIMIT
    newText = name + postfix + newText unless RegExp(name).exec newText

    @setState text: newText

  onKeyDown: (e) ->
    # Нажат Enter, введёный текст содержит какие-то символы, без Shift, Ctrl и Alt
    if e.which == 13 && e.target.value.match(/./) && !e.shiftKey && !e.ctrlKey && !e.altKey
      e.preventDefault()
      @props.onSubmit @$commentFormField.val()
      @$commentFormField.val('').trigger('blur').trigger 'autosize.resize'

  onBlur: (e) -> @setState text: e.target.value

  _getReplies: ->
    replies = []
    text    = @state.text
    regExp  = /@[^, ]{1,}/g

    replies = ( found[0] while found = regExp.exec(text) )

  _removeLastReply: ->
    text   = @state.text
    regExp = /, @[^,]{1,} /g

    text.replace regExp, ' '