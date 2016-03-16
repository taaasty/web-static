import React, { Component, PropTypes } from 'react';
import EntryTlogCommentEditForm from './EntryTlogCommentEditForm';
import EntryTlogComment from './EntryTlogComment';
import EntryTlogCommentSPA from './EntryTlogCommentSPA';

class EntryTlogCommentContainer extends Component {
  state = {
    edit: false,
    processEdit: false,
  };
  componentWillReceiveProps(nextProps) {
    if (this.state.processEdit) {
      this.setState({ processEdit: false });
    }
    if (this.props.comment.comment_html !== nextProps.comment.comment_html) {
      this.setState({ edit: false });
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
  render() {
    const { comment, commentator } = this.props;
    const { edit, processEdit } = this.state;
    const Comment = window.SPA ? EntryTlogCommentSPA : EntryTlogComment;

    return edit
      ? <EntryTlogCommentEditForm
          comment={comment}
          commentator={commentator}
          onCancel={this.show.bind(this)}
          onCommentUpdate={this.updateComment.bind(this)}
          process={processEdit}
        />
      : <Comment {...this.props} onCommentEdit={this.edit.bind(this)} />;
  }
}

EntryTlogCommentContainer.propTypes = {
  comment: PropTypes.object.isRequired,
  commentator: PropTypes.object,
  entryUrl: PropTypes.string.isRequired,
  isFeed: PropTypes.bool,
};

export default EntryTlogCommentContainer;
