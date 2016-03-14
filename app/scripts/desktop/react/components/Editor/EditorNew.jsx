import EditorActionCreators from '../../actions/editor';
import EditorContainer from './EditorContainer';

let EditorNew = React.createClass({
  propTypes: {
    tlog: React.PropTypes.object,
    tlogType: React.PropTypes.oneOf(['public', 'private', 'anonymous']).isRequired,
    backUrl: React.PropTypes.string
  },

  componentWillMount() {
    let { tlog, tlogType } = this.props;

    // Here we just initialize EditorStore data, it will be used in EditorContainer later on
    EditorActionCreators.init({
      tlog, tlogType,
      entry: null
    });
  },

  render() {
    return (
      <EditorContainer
          tlogType={this.props.tlogType}
          backUrl={this.props.backUrl}
          canChangeType={true} />
    );
  }
});

export default EditorNew;
