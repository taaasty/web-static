###* @jsx React.DOM ###

window.EntryCommentBox_CommentForm = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    user:   React.PropTypes.object.isRequired
    onLoad: React.PropTypes.func.isRequired

  getInitialState: ->
    isError:    false
    isLoading:  false
    isDisabled: false

  componentDidMount: ->
    @$commentFormField = $( @refs.commentFormField.getDOMNode() )
    @$commentFormField.autosize append:''

  componentWillUnmount: ->
    @$commentFormField.trigger 'autosize.destroy'

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
                        className="comment-form__field-textarea"
                        disabled={ this.state.isDisabled ? 'disabled' : '' }
                        onKeyDown={ this.onKeyDown } />
            </span>
          </form>
        </div>
      </div>
    </div>`

  onKeyDown: (e) ->
    if e.which == 13 && !e.shiftKey
      e.preventDefault()
      @addComment()

  addComment: ->
    @setState isDisabled: true

    @createRequest
      url: Routes.api.comments_url()
      method: 'POST'
      data:
        entry_id: @props.entryId
        text:     @getValue()
      success: (comment) =>
        @safeUpdateState => @props.onLoad 'add', comment
        @$commentFormField.val('').trigger('blur').trigger 'autosize.resize'
      error: (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isLoading: false, isDisabled: false

  getValue: -> @$commentFormField.val().replace /\n/g, ''