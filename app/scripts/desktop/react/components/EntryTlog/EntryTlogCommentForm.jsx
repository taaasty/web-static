/*global i18n */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Textarea from 'react-textarea-autosize';
import Avatar from '../../../../shared/react/components/common/Avatar';
import Spinner from '../../../../shared/react/components/common/Spinner';

const REPLIES_LIMIT = 5;

class EntryTlogCommentForm extends Component {
  state = {
    text: this.props.text || '',
  };
  componentDidMount() {
    // Ставим курсор в конец
    const field = findDOMNode(this.refs.field);

    if (field.setSelectionRange) {
      const len = field.value.length * 2;
      field.setSelectionRange(len, len);
    } else {
      field.value = field.value;
    }
  }
  focus() {
    this.refs.field.focus();
  }
  isEmpty() {
    return !this.state.text.trim();
  }
  clear() {
    this.setState({ text: '' });
  }
  addReply(username) {
    const userTag = `@${username}`;
    const postfix = /^@/.exec(this.state.text) ? ', ' : ' ';
    const replies = this.getReplies();
    const text = this.state.text;
    let newText;

    if (replies.length > REPLIES_LIMIT) {
      newText = this.removeLastReply();
    }
    if (!RegExp(userTag).test(text)) {
      newText = userTag + postfix + text;
    }

    this.setState({ text: newText }, this.focus);
  }
  getReplies() {
    const results = [];
    const text = this.state.text;
    const regExp = /@[^, ]{1,}/g;

    let found;
    while ((found = regExp.exec(text))) {
      results.push(found[0]);
    }
    return results;
  }
  removeLastReply() {
    return this.state.text.replace(/, @\w+(?=\s)/g, '');
  }
  submit() {
    this.props.onSubmit(this.state.text);
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleKeyDown(e) {
    switch(e.which) {
      case 13:
        if (!this.isEmpty() && !e.shiftKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          this.submit();
        }
        break;
      case 27:
        this.props.onCancel();
        break;
    }
  }
  handleButtonClick(e) {
    e.preventDefault();
    this.submit();
  }
  renderAvatar() {
    const { commentator: { userpic }, process } = this.props;

    return (
      <span className="comment-form__avatar">
        {
          process
            ? <Spinner size={30} />
            : <Avatar
                size={35}
                userpic={userpic}
              />
        }
      </span>
    );
  }
  renderSubmitButton() {
    if (!this.isEmpty() && !this.props.process) {
      return (
        <button className="comment-form__submit" onClick={this.handleButtonClick.bind(this)}>
          {i18n.t('comment_form_submit')}
        </button>
      );
    }
  }
  render() {
    return (
      <div className="comment-form">
        <div className="comment-form__table">
          <div className="comment-form__table-cell">
            <form>
              {this.renderAvatar()}
              {this.renderSubmitButton()}
              <span className="comment-form__field">
                <Textarea
                  className="comment-form__field-textarea"
                  disabled={this.props.process}
                  onChange={this.handleChange.bind(this)}
                  onKeyDown={this.handleKeyDown.bind(this)}
                  placeholder={i18n.t('comment_form_placeholder')}
                  ref="field"
                  value={this.state.text}
                />
              </span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EntryTlogCommentForm.propTypes = {
  commentator: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  process: PropTypes.bool,
  text: PropTypes.string,
};

export default EntryTlogCommentForm;
