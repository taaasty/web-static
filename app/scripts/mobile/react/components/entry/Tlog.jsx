import EntryMeta from './Meta/Meta';
import EntryComments from './comments/comments';
import EntryContent from './EntryContent';
import CurrentUserStore from '../../stores/currentUser';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import ComponentMixin from '../../mixins/component';
import EntryMixin from './mixins/entry';

let EntryTlog = React.createClass({
  mixins: [ConnectStoreMixin(CurrentUserStore), EntryMixin, ComponentMixin],

  propTypes: {
    entry: React.PropTypes.object.isRequired,
    loadPerTime: React.PropTypes.number,
    commentFormVisible: React.PropTypes.bool,
    onDelete: React.PropTypes.func,
    successDeleteUrl: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      commentFormVisible: false,
    }
  },

  getInitialState() {
    return {
      commentFormVisible: this.props.commentFormVisible,
      formFocus: !this.props.commentFormVisible,
    }
  },

  render() {
    return (
      <div className={this.getEntryClasses()}>
        <EntryContent entry={this.props.entry} />
        <EntryMeta
          entry={this.props.entry}
          commentsCount={this.state.commentsCount}
          onDelete={this.onDelete.bind(this)}
          onMetaCommentsClick={this.toggleCommentForm}
        />
        <EntryComments
          user={this.state.user}
          entry={this.props.entry}
          comments={this.state.comments}
          commentsCount={this.state.commentsCount}
          loading={this.isLoadingState()}
          loadPerTime={this.props.loadPerTime}
          formFocus={this.state.formFocus}
          formVisible={this.state.commentFormVisible}
          onCommentsLoadMore={this.loadMoreComments}
          onCommentCreate={this.createComment}
          onCommentEdit={this.editComment}
          onCommentDelete={this.deleteComment}
          onCommentReport={this.reportComment}
        />
      </div>
    );
  },

  toggleCommentForm() {
    const { commentFormVisible, formFocus } = this.state;

    this.setState({
      commentFormVisible: formFocus ? !commentFormVisible : true,
      formFocus: true,
    });
  },

  getStateFromStore() {
    return {
      user: CurrentUserStore.getUser()
    };
  },

  onDelete() {
    const { entry: { id }, onDelete, successDeleteUrl } = this.props;
    if (typeof onDelete === 'function') {
      onDelete(id);
    } else if (successDeleteUrl) {
      window.setTimeout(() => window.location.href = successDeleteUrl, 0);
    }
  },
});

export default EntryTlog;
