###* @jsx React.DOM ###

window.EntryCommentBox = React.createClass

  propTypes:
    entryId:  React.PropTypes.number.isRequired
    user:     React.PropTypes.object.isRequired

  getInitialState: ->
    comments: []

  render: ->
   `<section className="comments">
      <EntryCommentBox_CommentList comments={ this.state.comments }
                                   entryId={ this.props.entryId }
                                   onLoad={ this.updateComments } />
      <EntryCommentBox_CommentForm entryId={ this.props.entryId }
                                   user={ this.props.user }
                                   onLoad={ this.updateComments } />
    </section>`

  updateComments: (action, data) ->
    switch action
      when 'add'    then newComments = @state.comments.concat data
      when 'update' then newComments = data.comments
      when 'more'   then newComments = data.comments.concat @state.comments
      else console.warn 'Неизвестное действие для работы с комментариями'
    console.log action, data
    @setState comments: newComments