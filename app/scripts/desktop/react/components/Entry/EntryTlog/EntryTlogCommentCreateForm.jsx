import React, { Component, PropTypes } from 'react';
import EntryTlogCommentForm from './EntryTlogCommentForm';

const FORM_SHOW_STATE = 'show',
      FORM_LINK_STATE = 'link',
      FORM_HIDDEN_STATE = 'hidden';

export default class EntryTlogCommentCreateForm extends Component {
  static propTypes = {
    entryID: PropTypes.number.isRequired,
    commentator: PropTypes.object.isRequired,
    totalCommentsCount: PropTypes.number.isRequired,
    process: PropTypes.bool
  }
  state = {
    currentState: this.props.totalCommentsCount === 0 ? FORM_LINK_STATE : FORM_SHOW_STATE
  }
  render() {
    switch(this.state.currentState) {
      case FORM_SHOW_STATE:
        return (
          <EntryTlogCommentForm
              ref="form"
              commentator={this.props.commentator}
              process={this.props.process}
              onSubmit={this.props.onCommentCreate}
              onCancel={::this.close} />
        );
      case FORM_LINK_STATE:
        return (
          <div className="comments__more">
            <a className="comments__more-link" onClick={::this.open}>
              {i18n.t('comment_more_link')}
            </a>
          </div>
        );
      default:
        return null;
    }
  }
  clear() {
    if (this.state.currentState === FORM_SHOW_STATE) {
      this.refs.form.clear();
    }
  }
  reply(username) {
    if (this.state.currentState === FORM_SHOW_STATE) {
      this.refs.form.addReply(username);
    }
  }
  close() {
    let newState = this.props.totalCommentsCount > 1 ? FORM_LINK_STATE : FORM_HIDDEN_STATE;
    this.setState({ currentState: newState });
  }
  open() {
    this.setState({ currentState: FORM_SHOW_STATE });
  }
}

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