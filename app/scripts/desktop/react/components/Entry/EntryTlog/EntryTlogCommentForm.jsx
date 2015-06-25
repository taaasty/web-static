import React, { Component, PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';
import Avatar from '../../../../../shared/react/components/common/Avatar';

const REPLIES_LIMIT = 5;

export default class EntryTlogCommentForm extends Component {
  static propTypes = {
    commentator: PropTypes.object.isRequired,
    text: PropTypes.string,
    process: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }
  state = {
    text: this.props.text || ''
  }
  componentDidMount() {
    // Ставим курсор в конец
    let field = React.findDOMNode(this.refs.field);

    if (field.setSelectionRange) {
      let len = field.value.length * 2;
      field.setSelectionRange(len, len);
      field.focus();
    } else {
      field.value = field.value;
      field.focus();
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
                    ref="field"
                    value={this.state.text}
                    placeholder={i18n.t('comment_form_placeholder')}
                    disabled={this.props.process}
                    className="comment-form__field-textarea"
                    onChange={::this.handleChange}
                    onKeyDown={::this.handleKeyDown} />
              </span>
            </form>
          </div>
        </div>
      </div>
    );
  }
  renderAvatar() {
    let avatar;

    if (this.props.process) {
      avatar = <Spinner size={31} />;
    } else {
      avatar = <Avatar userpic={this.props.commentator.userpic} size={35} />
    }

    return (
      <span className="comment-form__avatar">
        {avatar}
      </span>
    );
  }
  renderSubmitButton() {
    if (!this.isEmpty() && !this.props.process) {
      return (
        <button className="comment-form__submit" onClick={::this.handleButtonClick}>
          {i18n.t('comment_form_submit')}
        </button>
      );
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
    let userTag = `@${username}`,
        postfix = /^@/.exec(this.state.text) ? ', ' : ' ',
        newText = this.state.text,
        replies = this.getReplies();

    if (replies.length > REPLIES_LIMIT) {
      newText = this.removeLastReply();
    }
    if (!RegExp(userTag).test(newText)) {
      newText = userTag + postfix + newText;
    }

    this.setState({ text: newText }, this.focus);
  }
  getReplies() {
    let replies = [],
        text = this.state.text,
        regExp = /@[^, ]{1,}/g;

    let found, results = [];
    while (found = regExp.exec(text)) {
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
}