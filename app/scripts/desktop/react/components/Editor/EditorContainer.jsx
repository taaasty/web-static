import EditorActionCreators from '../../actions/editor';
import EditorStore from '../../stores/EditorStore';
import CurrentUserStore from '../../stores/current_user';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Editor from './Editor';

let EditorContainer = React.createClass({
  propTypes: {
    tlog: React.PropTypes.object,
    tlogType: React.PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired,
    entry: React.PropTypes.object.isRequired,
    entryType: React.PropTypes.string.isRequired,
    entryPrivacy: React.PropTypes.string.isRequired,
    userID: React.PropTypes.number.isRequired,
    backUrl: React.PropTypes.string,
    canChangeType: React.PropTypes.bool,
    loading: React.PropTypes.bool.isRequired
  },

  render() {
    let actions = {
      onSaveEntry: this.saveEntry,
      onChangePrivacy: this.changePrivacy,
      onChangeType: this.changeType
    };

    return <Editor {...this.props} {...actions} />;
  },

  saveEntry() {
    EditorActionCreators.saveEntry();
  },

  changePrivacy(privacy) {
    EditorActionCreators.changeEntryPrivacy(privacy);
  },

  changeType(type) {
    EditorActionCreators.changeEntryType(type);
  }
});

EditorContainer = connectToStores(EditorContainer, [EditorStore, CurrentUserStore], (props) => ({
  tlog: EditorStore.getTlog(),
  entry: EditorStore.getEntry(),
  entryType: EditorStore.getEntryType(),
  entryPrivacy: EditorStore.getEntryPrivacy(),
  userID: CurrentUserStore.getUserID(),
  loading: EditorStore.isLoading()
}));

export default EditorContainer;