import EditorTypeText from '../types/Text';
import EditorTypeImage from '../types/Image';
import EditorTypeInstagram from '../types/Instagram';
import EditorTypeMusic from '../types/Music';
import EditorTypeVideo from '../types/Video';
import EditorTypeQuote from '../types/Quote';

let EditorArea = React.createClass({
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    entryType: React.PropTypes.string.isRequired,
    entryPrivacy: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired
  },

  render() {
    return (
      <section className="posts posts--edit">
        {this.renderEditor()}
      </section>
    );
  },

  renderEditor() {
    let { entry, entryType, loading } = this.props;
    let props = {entry, entryType, loading};
    let Component;

    switch(entryType) {
      case 'text':
      case 'anonymous': Component = EditorTypeText; break;
      case 'image':     Component = EditorTypeImage; break;
      case 'instagram': Component = EditorTypeInstagram; break;
      case 'music':     Component = EditorTypeMusic; break;
      case 'video':     Component = EditorTypeVideo; break;
      case 'quote':     Component = EditorTypeQuote; break;
      default: console.warn('Unknown type of normalized entry', entryType);
    }

    return <Component {...props} />;
  }

});

export default EditorArea;