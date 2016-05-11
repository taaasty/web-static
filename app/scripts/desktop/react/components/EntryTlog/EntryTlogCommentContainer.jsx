import React, { Component, PropTypes } from 'react';
import EntryTlogCommentEditForm from './EntryTlogCommentEditForm';
import EntryTlogComment from './EntryTlogComment';

class EntryTlogCommentContainer extends Component {
  state = {
    edit: false,
  };
  updateComment(text) {
    this.props.onCommentUpdate(text)
      .then(this.show.bind(this));
  }
  edit() {
    this.setState({ edit: true });
  }
  show() {
    this.setState({ edit: false });
  }
  render() {
    const { comment, commentator } = this.props;
    const { edit } = this.state;

    return edit
      ? <EntryTlogCommentEditForm
          comment={comment}
          commentator={commentator}
          onCancel={this.show.bind(this)}
          onCommentUpdate={this.updateComment.bind(this)}
          process={comment.isProcessing}
        />
      : <EntryTlogComment {...this.props} onCommentEdit={this.edit.bind(this)} />;
  }
}

EntryTlogCommentContainer.propTypes = {
  comment: PropTypes.object.isRequired,
  commentator: PropTypes.object,
  entryUrl: PropTypes.string.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
};

export default EntryTlogCommentContainer;
