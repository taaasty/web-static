import React, { Component, PropTypes } from 'react';
import EntryTlogCommentEditForm from './EntryTlogCommentEditForm';
import EntryTlogComment from './EntryTlogComment';

class EntryTlogCommentContainer extends Component {
  state = {
    edit: false,
  };
  shouldComponentUpdate(nextProps) {
    const { comment, commentState, commentUser, commentator , entryUrl } = this.props;

    return (
      comment !== nextProps.comment ||
      commentState !== nextProps.commentState ||
      commentUser !== nextProps.commentUser ||
      commentator !== nextProps.commentator ||
      entryUrl !== nextProps.entryUrl
    );
  }
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
    console.count('commentItem');
    const { comment, commentState, commentator } = this.props;
    const { edit } = this.state;

    return edit
      ? <EntryTlogCommentEditForm
          commentHtml={comment.get('commentHtml', '')}
          commentator={commentator}
          onCancel={this.show.bind(this)}
          onCommentUpdate={this.updateComment.bind(this)}
          process={commentState.get('isProcessing', false)}
        />
      : <EntryTlogComment {...this.props} onCommentEdit={this.edit.bind(this)} />;
  }
}

EntryTlogCommentContainer.propTypes = {
  comment: PropTypes.object.isRequired,
  commentState: PropTypes.object.isRequired,
  commentUser: PropTypes.object.isRequired,
  commentator: PropTypes.object,
  entryUrl: PropTypes.string.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
};

export default EntryTlogCommentContainer;
