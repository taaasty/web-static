import EntryMeta from './Meta/Meta';
import EntryComments from './comments/comments';
import EntryContent from './content/content';
import CurrentUserStore from '../../stores/currentUser';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import ComponentMixin from '../../mixins/component';
import EntryMixin from './mixins/entry';

let EntryTlog = React.createClass({
  mixins: [ConnectStoreMixin(CurrentUserStore), EntryMixin, ComponentMixin],

  propTypes: {
    entry: React.PropTypes.object.isRequired,
    loadPerTime: React.PropTypes.number,
    commentFormVisible: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      commentFormVisible: false
    }
  },

  getInitialState() {
    return {
      commentFormVisible: this.props.commentFormVisible
    }
  },

  render() {
    return (
      <div className={this.getEntryClasses()}>
        <EntryContent entry={this.props.entry} />
        <EntryMeta
            entry={this.props.entry}
            commentsCount={this.state.commentsCount}
            onMetaCommentsClick={this.toggleCommentForm} />        
        <EntryComments
            user={this.state.user}
            entry={this.props.entry}
            comments={this.state.comments}
            commentsCount={this.state.commentsCount}
            loading={this.isLoadingState()}
            loadPerTime={this.props.loadPerTime}
            formVisible={this.state.commentFormVisible}
            onCommentsLoadMore={this.loadMoreComments}
            onCommentCreate={this.createComment}
            onCommentEdit={this.editComment}
            onCommentDelete={this.deleteComment}
            onCommentReport={this.reportComment} />
      </div>
    );
  },

  toggleCommentForm() {
    this.setState({commentFormVisible: !this.state.commentFormVisible});
  },

  getStateFromStore() {
    return {
      user: CurrentUserStore.getUser()
    }
  }
});

export default EntryTlog;