import React, { Component, PropTypes } from 'react';
import EntryTlogCommentEditForm from './EntryTlogCommentEditForm';
import EntryTlogComment from './EntryTlogComment';

export default class EntryTlogCommentContainer extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    entryUrl: PropTypes.string.isRequired
  }
  state = {
    edit: false,
    processEdit: false
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.processEdit) {
      this.setState({ processEdit: false });
    }
    if (this.props.comment.comment_html !== nextProps.comment.comment_html) {
      this.setState({ edit: false });
    }
  }
  render() {
    if (this.state.edit) {
      return (
        <EntryTlogCommentEditForm
            comment={this.props.comment}
            commentator={this.props.commentator}
            process={this.state.processEdit}
            onCommentUpdate={::this.updateComment}
            onCancel={::this.show} />
      );
    } else {
      return (
        <EntryTlogComment {...this.props} onCommentEdit={::this.edit} />
      );
    }
  }
  updateComment(text) {
    this.setState({ processEdit: true }, () => {
      this.props.onCommentUpdate(text);
    });
  }
  edit() {
    this.setState({ edit: true });
  }
  show() {
    this.setState({ edit: false });
  }
}