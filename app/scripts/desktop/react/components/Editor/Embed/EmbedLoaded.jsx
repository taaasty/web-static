import MediaBox from '../MediaBox/MediaBox';
import MediaBoxActions from '../MediaBox/MediaBoxActions';

let EditorEmbedLoaded = React.createClass({
  propTypes: {
    embedHtml: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <MediaBox entryType="video" state="loaded">
        <div className="media-box__display"
             dangerouslySetInnerHTML={{__html: this.props.embedHtml || ''}} />
        <MediaBoxActions onDelete={this.props.onDelete} />
      </MediaBox>  
    );
  }
});

export default EditorEmbedLoaded;