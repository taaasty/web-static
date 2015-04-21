import EditorActionCreators from '../../actions/editor';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import EditorStore from '../../stores/editor';
import Editor from './Editor';

let EditorContainer = React.createClass({
  mixins: [ConnectStoreMixin(EditorStore)],

  propTypes: {
    tlogType: React.PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired,
    backUrl: React.PropTypes.string,
    canChangeType: React.PropTypes.bool
  },

  render() {
    let actions = {
      onSaveEntry: this.saveEntry,
      onChangePrivacy: this.changePrivacy,
      onChangeType: this.changeType
    };

    return (
      <Editor {...this.state} {...actions}
          tlogType={this.props.tlogType}
          backUrl={this.props.backUrl}
          canChangeType={this.props.canChangeType} />
    )
  },

  saveEntry() {
    EditorActionCreators.saveEntry();
  },

  changePrivacy(privacy) {
    EditorActionCreators.changeEntryPrivacy(privacy);
  },

  changeType(type) {
    EditorActionCreators.changeEntryType(type);
  },

  getStateFromStore() {
    return {
      entry: EditorStore.getEntry(),
      entryType: EditorStore.getEntryType(),
      entryPrivacy: EditorStore.getEntryPrivacy(),
      loading: EditorStore.isLoading()
    }
  }
});

export default EditorContainer;