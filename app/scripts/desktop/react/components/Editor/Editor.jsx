import EditorLayout from './Layout/Layout';
import EditorActions from './Actions/Actions';
import EditorTypeSwitcher from './TypeSwitcher/TypeSwitcher';
import EditorArea from './Area/Area';

let Editor = React.createClass({
  propTypes: {
    tlog: React.PropTypes.object.isRequired,
    tlogType: React.PropTypes.string.isRequired,
    entry: React.PropTypes.object.isRequired,
    entryType: React.PropTypes.string.isRequired,
    entryPrivacy: React.PropTypes.string.isRequired,
    userID: React.PropTypes.number.isRequired,
    backUrl: React.PropTypes.string,
    canChangeType: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    onSaveEntry: React.PropTypes.func.isRequired,
    onChangePrivacy: React.PropTypes.func.isRequired,
    onChangeType: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <EditorLayout loading={this.props.loading} backUrl={this.props.backUrl}>
        <EditorActions
            tlog={this.props.tlog}
            entryPrivacy={this.props.entryPrivacy}
            tlogType={this.props.tlogType}
            userID={this.props.userID}
            loading={this.props.loading}
            onSaveEntry={this.props.onSaveEntry}
            onChangePrivacy={this.props.onChangePrivacy} />
        <EditorArea
            entry={this.props.entry}
            entryType={this.props.entryType}
            entryPrivacy={this.props.entryPrivacy}
            loading={this.props.loading} />
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