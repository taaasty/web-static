import React, { createClass, PropTypes } from 'react';

import { TLOG_ENTRY_TYPE_ANONYMOUS } from '../../../../shared/constants/TlogEntry';

import EntryMeta from './Meta/Meta';
import EntryFeedMeta from './Feed/Meta';
import EntryComments from './comments/comments';
import EntryContent from './EntryContent';
import CurrentUserStore from '../../stores/currentUser';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import ComponentMixin from '../../mixins/component';
import EntryMixin from './mixins/entry';

const EntryFeed = createClass({
  propTypes: {
    commentFormVisible: PropTypes.bool,
    entry: PropTypes.object.isRequired,
    loadPerTime: PropTypes.number,
  },
  mixins: [ ConnectStoreMixin(CurrentUserStore), EntryMixin, ComponentMixin ],

  getDefaultProps() {
    return {
      commentFormVisible: false,
    };
  },

  getInitialState() {
    return {
      commentFormVisible: this.props.commentFormVisible,
    };
  },

  toggleCommentForm() {
    this.setState({ commentFormVisible: !this.state.commentFormVisible });
  },

  getStateFromStore() {
    return {
      user: CurrentUserStore.getUser(),
    };
  },

  render() {
    const { entry, loadPerTime } = this.props;
    const { comments, commentsCount, commentFormVisible, user } = this.state;
    const isAnonymous = entry.type === TLOG_ENTRY_TYPE_ANONYMOUS;

    return (
      <div className={this.getEntryClasses()}>
        {!isAnonymous && <EntryFeedMeta author={entry.author} />}
        <EntryContent entry={entry} />
        <EntryMeta
          commentsCount={commentsCount}
          entry={entry}
          onMetaCommentsClick={this.toggleCommentForm}
        />
        <EntryComments
          comments={comments}
          commentsCount={commentsCount}
          entry={entry}
          formVisible={commentFormVisible}
          loadPerTime={loadPerTime}
          loading={this.isLoadingState()}
          onCommentCreate={this.createComment}
          onCommentDelete={this.deleteComment}
          onCommentEdit={this.editComment}
          onCommentReport={this.reportComment}
          onCommentsLoadMore={this.loadMoreComments}
          user={user}
        />
      </div>
    );
  },
});

export default EntryFeed;
