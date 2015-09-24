import React, { Component, PropTypes } from 'react';
import EntryTlogCommentForm from './EntryTlogCommentForm';

const FORM_SHOW_STATE = 'show',
      FORM_LINK_STATE = 'link',
      FORM_HIDDEN_STATE = 'hidden';

export default class EntryTlogCommentCreateForm extends Component {
  static propTypes = {
    entryID: PropTypes.number.isRequired,
    commentator: PropTypes.object.isRequired,
    isInList: PropTypes.bool,
    totalCommentsCount: PropTypes.number.isRequired,
    process: PropTypes.bool,
  }
  state = {
    currentState: this.props.isInList
      ? this.props.totalCommentsCount > 5 ? FORM_LINK_STATE : FORM_HIDDEN_STATE
      : FORM_SHOW_STATE,
  }
  render() {
    switch(this.state.currentState) {
      case FORM_SHOW_STATE:
        return (
          <EntryTlogCommentForm
            commentator={this.props.commentator}
            onCancel={::this.close}
            onSubmit={this.props.onCommentCreate}
            process={this.props.process}
            ref="form"
          />
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
    } else {
      this.setState({ currentState: FORM_SHOW_STATE }, () => {
        this.refs.form.addReply(username);
      });
    }
  }
  close() {
    let newState = this.props.totalCommentsCount > 5 ? FORM_LINK_STATE : FORM_HIDDEN_STATE;
    this.setState({ currentState: newState });
  }
  open() {
    this.setState({ currentState: FORM_SHOW_STATE }, () => {
      this.refs.form.focus();
    });
  }
}
