import EditorLayout from './Layout/Layout';
import EditorActions from './Actions/Actions';
import EditorTypeSwitcher from './TypeSwitcher/TypeSwitcher';
import EditorArea from './Area/Area';

let Editor = React.createClass({
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    entryType: React.PropTypes.string.isRequired,
    entryPrivacy: React.PropTypes.string.isRequired,
    tlogType: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string,
    loading: React.PropTypes.bool.isRequired,
    canChangeType: React.PropTypes.bool.isRequired,
    onSaveEntry: React.PropTypes.func.isRequired,
    onChangePrivacy: React.PropTypes.func.isRequired,
    onChangeType: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <EditorLayout loading={this.props.loading} backUrl={this.props.backUrl}>
        <EditorActions
            entryPrivacy={this.props.entryPrivacy}
            tlogType={this.props.tlogType}
            loading={this.props.loading}
            onSaveEntry={this.props.onSaveEntry}
            onChangePrivacy={this.props.onChangePrivacy} />
        <EditorArea
            entry={this.props.entry}
            entryType={this.props.entryType}
            entryPrivacy={this.props.entryPrivacy} />
        {this.renderTypeSwitcher()}
      </EditorLayout>
    )
  },

  renderTypeSwitcher() {
    if (this.props.tlogType !== 'anonymous') {
      return (
        <EditorTypeSwitcher
            entryType={this.props.entryType}
            canChangeType={this.props.canChangeType}
            loading={this.props.loading}
            onChangeType={this.props.onChangeType} />
      );
    }
  }
});

export default Editor;