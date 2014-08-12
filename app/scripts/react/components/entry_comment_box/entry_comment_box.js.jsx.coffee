###* @jsx React.DOM ###

window.EntryCommentBox = React.createClass

  propTypes:
    entryId:  React.PropTypes.number.isRequired
    user:     React.PropTypes.object.isRequired

  getInitialState: ->
    comments:        []
    total_count:     null
    last_comment_id: null

  render: ->
   `<section className="comments">
      <div style={{ display: 'none' }} className="comments__more">
        <a className="comments__more-link" title="Загрузить все 0 комментариев" href="">Загрузить все 0 комментариев</a>
      </div>
      <EntryCommentBox_CommentList comments={ this.state.comments }
                                   entryId={ this.props.entryId }
                                   onLoad={ this.updateComments } />
      <EntryCommentBox_CommentForm entryId={ this.props.entryId }
                                   user={ this.props.user }
                                   onLoad={ this.updateComments } />
    </section>`

  updateComments: (action, data) ->
    switch action
      when 'add'
        state = {
          comments:        @state.comments.concat data
          total_count:     @state.total_count + 1
          last_comment_id: data.id
        }
      when 'update'
        state = {
          comments:        data.comments
          total_count:     data.total_count
          last_comment_id: data.last_comment_id
        }
      else console.warn 'Неизвестное действие для работы с комментариями'

    @setState state