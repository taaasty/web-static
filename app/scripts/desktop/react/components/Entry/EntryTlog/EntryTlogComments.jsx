import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../../actions/Entry';
import EntryTlogCommentCreateForm from './EntryTlogCommentCreateForm';
import EntryTlogCommentList from './EntryTlogCommentList';

const LOAD_COMMENTS_LIMIT = 50;

export default class EntryTlogComments extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    limit: PropTypes.number
  }
  static defaultProps = {
    comments: [],
    limit: LOAD_COMMENTS_LIMIT
  }
  state = {
    comments: this.props.entry.comments,
    totalCount: this.props.entry.comments_count,
    processCreate: false
  }
  render() {
    return (
      <section className="comments">
        {this.renderCommentList()}
        {this.renderCommentForm()}
      </section>
    );
  }
  renderCommentList() {
    if (this.state.comments.length) {
      return (
        <EntryTlogCommentList
            comments={this.state.comments}
            entryUrl={this.props.entry.url}
            onCommentReply={::this.reply} />
      );
    }
  }
  renderCommentForm() {
    if (this.props.commentator) {
      const actions = {
        onCommentCreate: ::this.createComment
      };

      return (
        <EntryTlogCommentCreateForm {...this.props} {...actions}
            ref="createForm"
            entryID={this.props.entry.id}
            totalCommentsCount={this.state.totalCount}
            process={this.state.processCreate} />
      );
    }
  }
  createComment(text) {
    this.setState({ processCreate: true });

    EntryActionCreators.createComment(this.props.entry.id, text)
      .then((comment) => {
        this.setState({
          comments: this.state.comments.concat(comment),
          totalCount: this.state.totalCount + 1
        }, () => {
          $(document).trigger('domChanged');
        });
        this.refs.createForm.clear();
      })
      .always(() => {
        this.setState({ processCreate: false });
      });
  }
  reply(username) {
    this.refs.createForm.reply(username);
  }
}

// window.EntryCommentBox = React.createClass
//   mixins: ['CommentsMixin']

//   propTypes:
//     entryId:            React.PropTypes.number.isRequired
//     entryUrl:           React.PropTypes.string.isRequired
//     user:               React.PropTypes.object
//     limit:              React.PropTypes.number
//     isEntryPage:        React.PropTypes.bool.isRequired
//     totalCommentsCount: React.PropTypes.number.isRequired

//   getDefaultProps: ->
//     limit: MORE_COMMENTS_LIMIT

//   render: ->
//     if @props.user
//       commentForm = <EntryCommentBox_CommentCreateFormManager user={ this.props.user }
//                                                               isEntryPage={ this.props.isEntryPage }
//                                                               totalCommentsCount={ this.props.totalCommentsCount }
//                                                               entryId={ this.props.entryId }
//                                                               onCommentAdded={ this.onCommentAdded } />

//     if @state.comments.length > 0
//       commentList = <EntryCommentBox_CommentList comments={ this.state.comments }
//                                                  entryId={ this.props.entryId }
//                                                  entryUrl={ this.props.entryUrl }
//                                                  sharedCommentId={ this.state.sharedCommentId }
//                                                  user={ this.props.user }
//                                                  onDelete={ this.removeComment } />

//       if @state.totalCount > @state.comments.length
//         loadMoreButton = <EntryCommentBox_LoadMore totalCount={ this.state.totalCount }
//                                                    loadedCount={ this.state.comments.length }
//                                                    limit={ this.props.limit }
//                                                    onClick={ this.loadMoreComments } />
//     else
//       if @state.isLoadError || @state.isLoadMoreError || @state.isPostError
//         commentList = <div>{ i18n.t('load_comments_error') }</div>
//       else if @state.isLoadLoading || @state.isLoadMoreLoading
//         commentList = <Spinner size={ 15 } />

//     return <section className="comments">
//              { loadMoreButton }
//              { commentList }
//              { commentForm }
//            </section>

//   onCommentAdded: (comment) ->
//     @safeUpdate =>
//       @setState {
//         comments:   @state.comments.concat comment
//         totalCount: @state.totalCount + 1
//       }
//       $(document).trigger 'domChanged'






//       HIDDEN_STATE = 'hidden'
// FORM_STATE   = 'form'
// LINK_STATE   = 'link'

// window.EntryCommentBox_CommentCreateFormManager = React.createClass
//   mixins: [RequesterMixin, ComponentManipulationsMixin]

//   propTypes:
//     entryId:            React.PropTypes.number.isRequired
//     user:               React.PropTypes.object.isRequired
//     isEntryPage:        React.PropTypes.bool
//     totalCommentsCount: React.PropTypes.number.isRequired
//     onCommentAdded:     React.PropTypes.func.isRequired

//   getInitialState: ->
//     currentState:  HIDDEN_STATE
//     isPostLoading: false

//   componentDidMount: ->
//     window.commentsMediator.registerForm @

//     if @isCurrentlyOpen()
//       @setState currentState: FORM_STATE
//     else if @props.totalCommentsCount == 0
//       @setState currentState: HIDDEN_STATE
//     else
//       @setState currentState: LINK_STATE

//   componentWillUnmount: -> window.commentsMediator.unregisterForm @

//   render: ->
//     switch @state.currentState
//       when FORM_STATE   then form = <EntryCommentBox_CommentForm ref="commentForm"
//                                                                  user={ this.props.user }
//                                                                  isLoading={ this.state.isPostLoading }
//                                                                  onSubmit={ this.onSubmit }
//                                                                  onCancel={ this.onCancel } />
//       when HIDDEN_STATE then form = <div />
//       when LINK_STATE   then form = <div className="comments__more">
//                                       <a onClick={ this.onClick }
//                                          className="comments__more-link">
//                                         { i18n.t('comment_more_link') }
//                                       </a>
//                                     </div>
//       else console.warn 'Неизвестное состояние формы ввода комментария', @state.currentState

//     form

//   isCurrentlyOpen: -> @props.isEntryPage

//   isClosed: -> @state.currentState != FORM_STATE

//   openAndReply: (name) ->
//     @openForm() if @isClosed()
//     _.defer => @refs.commentForm.addReply name

//   openForm: ->
//     @setState currentState: FORM_STATE
//     _.defer => @refs.commentForm.refs.commentFormField.getDOMNode().focus()

//   closeForm: ->
//     if @props.totalCommentsCount == 0
//       @setState currentState: HIDDEN_STATE
//     else
//       @setState currentState: LINK_STATE

//   clearForm: ->
//     @refs.commentForm.refs.commentFormField.getDOMNode().value = ''

//   onClick: ->
//     window.commentsMediator.doCommentClicked @props.entryId

//   onSubmit: (text) ->
//     @setState isPostError: false, isPostLoading: true

//     @createRequest
//       url: ApiRoutes.comments_url()
//       method: 'POST'
//       data:
//         entry_id: @props.entryId
//         text:     text
//       success: (comment) =>
//         @props.onCommentAdded comment

//         if @isCurrentlyOpen()
//           @clearForm()
//         else
//           window.commentsMediator.doFormClosed @
//       error: (data) =>
//         @safeUpdateState isPostError: true
//         NoticeService.errorResponse data
//       complete: =>
//         @safeUpdateState isPostLoading: false

//   onCancel: -> window.commentsMediator.doFormClosed()