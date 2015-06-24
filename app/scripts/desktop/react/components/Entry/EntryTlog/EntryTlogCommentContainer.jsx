import React, { PropTypes } from 'react';
import EntryTlogCommentEditForm from './EntryTlogCommentEditForm';
import EntryTlogComment from './EntryTlogComment';

export default class EntryTlogCommentContainer {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    entryUrl: PropTypes.string.isRequired
  }
  state = {
    edit: false
  }
  render() {
    if (this.state.edit) {
      return (
        <EntryTlogCommentEditForm
            comment={this.props.comment}
            onCommentEdit={this.props.onCommentEdit}
            onCancel={this.show} />
      );
    } else {
      return (
        <EntryTlogComment {...this.props} onEdit={this.edit} />
      );
    }
  }
}