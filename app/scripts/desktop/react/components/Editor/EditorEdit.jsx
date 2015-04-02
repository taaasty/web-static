import EditorActionCreators from '../../actions/editor';
import EditorContainer from './EditorContainer';

let EditorEdit = React.createClass({
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    tlogType: React.PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired,
    backUrl: React.PropTypes.string
  },

  componentWillMount() {
    // Here we just initialize EditorStore data, it will be used in EditorContainer later on
    let { entry, tlogType } = this.props;
    EditorActionCreators.init({entry, tlogType});
  },

  render() {
    return (
      <EditorContainer
          tlogType={this.props.tlogType}
          backUrl={this.props.backUrl}
          canChangeType={false} />
    );
  }
});

export default EditorEdit;