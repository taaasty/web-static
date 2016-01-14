/*global i18n */
import React, { Component, PropTypes } from 'react';
import EntryTlogCommentForm from './EntryTlogCommentForm';

const FORM_SHOW_STATE = 'show',
      FORM_LINK_STATE = 'link',
      FORM_HIDDEN_STATE = 'hidden';

class EntryTlogCommentCreateForm extends Component {
  state = {
    currentState: this.props.hideCommentForm
      ? this.props.totalCommentsCount > 5 ? FORM_LINK_STATE : FORM_HIDDEN_STATE
      : FORM_SHOW_STATE,
  };
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
    const newState = this.props.totalCommentsCount > 5 ? FORM_LINK_STATE : FORM_HIDDEN_STATE;
    this.setState({ currentState: newState });
  }
  open() {
    this.setState({ currentState: FORM_SHOW_STATE }, () => {
      this.refs.form.focus();
    });
  }
  render() {
    const { commentator, onCommentCreate, process } = this.props;

    switch(this.state.currentState) {
      case FORM_SHOW_STATE:
        return (
          <EntryTlogCommentForm
            commentator={commentator}
            onCancel={this.close.bind(this)}
            onSubmit={onCommentCreate}
            process={process}
            ref="form"
          />
        );
      case FORM_LINK_STATE:
        return (
          <div className="comments__more">
            <a className="comments__more-link" onClick={this.open.bind(this)}>
              {i18n.t('comment_more_link')}
            </a>
          </div>
        );
      default:
        return null;
    }
  }
}

EntryTlogCommentCreateForm.propTypes = {
  commentator: PropTypes.object.isRequired,
  entryID: PropTypes.number.isRequired,
  hideCommentForm: PropTypes.bool,
  onCommentCreate: PropTypes.func,
  process: PropTypes.bool,
  totalCommentsCount: PropTypes.number.isRequired,
};

export default EntryTlogCommentCreateForm;
