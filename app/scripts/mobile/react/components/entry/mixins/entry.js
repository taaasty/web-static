import assign from 'react/lib/Object.assign';
import EntryViewActions from '../../../actions/view/entry';

const LOAD_MORE_COMMENTS_LIMIT = 30,
      TEXT_TYPE  = 'text',
      IMAGE_TYPE = 'image',
      VIDEO_TYPE = 'video',
      QUOTE_TYPE = 'quote';

let EntryMixin = {
  getDefaultProps() {
    return {
      loadPerTime: LOAD_MORE_COMMENTS_LIMIT
    };
  },

  getInitialState() {
    let comments = [],
        commentsCount = 0;

    if (this.props.entry.comments_info != null) {
      comments = this.props.entry.comments_info.comments;
      commentsCount = this.props.entry.comments_info.total_count;
    }

    return {
      comments, commentsCount,
      loading: false
    };
  },

  isLoadingState() {
    return this.state.loading === true;
  },

  activateLoadingState() {
    this.setState({loading: true});
  },

  deactivateLoadingState() {
    this.setState({loading: false});
  },

  loadMoreComments() {
    let entryID = this.props.entry.id,
        toCommentID = this.state.comments[0].id,
        limit = this.props.loadPerTime;

    this.activateLoadingState();

    EntryViewActions.loadComments(entryID, toCommentID, limit)
      .then((commentsInfo) => {
        let { comments, total_count: commentsCount } = commentsInfo;

        this.safeUpdateState({
          commentsCount,
          comments: comments.concat(this.state.comments)
        });
      })
      .always(this.deactivateLoadingState);
  },

  createComment(text) {
    let entryID = this.props.entry.id;

    EntryViewActions.createComment(entryID, text)
      .then((comment) => {
        let newComments = [...this.state.comments];
        newComments.push(comment);

        this.safeUpdateState({
          comments: newComments,
          commentsCount: this.state.commentsCount + 1
        });
      })
      .always(this.deactivateLoadingState);
  },

  editComment(commentID, text) {
    let entryID = this.props.entry.id;

    EntryViewActions.editComment(entryID, commentID, text)
      .then((comment) => {
        for (let i = 0, len = this.state.comments.length; i < len; i++) {
          if (this.state.comments[i].id === comment.id) {
            assign(this.state.comments[i], comment);
            break;
          }
        }
        this.forceUpdate();
      });
  },

  deleteComment(commentID) {
    let entryID = this.props.entry.id;

    EntryViewActions.deleteComment(entryID, commentID)
      .then(() => {
        let newComments = [...this.state.comments];

        for (let i = 0, len = this.state.comments.length; i < len; i++) {
          if (this.state.comments[i].id === commentID) {
            newComments.splice(i, 1);
            break;
          }
        }

        this.safeUpdateState({
          comments: newComments,
          commentsCount: this.state.commentsCount - 1
        });
      });
  },

  reportComment(commentID) {
    EntryViewActions.reportComment(commentID);
  },

  getEntryClasses() {
    let typeClass;
    // Small hack, depends on layout
    switch(this.props.entry.type) {
      case TEXT_TYPE:
        typeClass = 'text'; break;
      case IMAGE_TYPE:
        typeClass = 'image'; break;
      case VIDEO_TYPE:
        typeClass = 'video'; break;
      case QUOTE_TYPE:
        typeClass = 'quote'; break;
      default:
        typeClass = 'text';
    }

    return `post post--${typeClass}`;
  }
};

export default EntryMixin;