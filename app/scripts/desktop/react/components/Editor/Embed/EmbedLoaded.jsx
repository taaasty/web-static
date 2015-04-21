import MediaBox from '../MediaBox/MediaBox';
import MediaBoxActions from '../MediaBox/MediaBoxActions';

let EditorEmbedLoaded = React.createClass({
  propTypes: {
    embedHtml: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired
  },

  render() {
    return (
      <MediaBox entryType="video" state="loaded">
        <div className="media-box__display"
             dangerouslySetInnerHTML={{__html: this.props.embedHtml || ''}} />
        {this.renderActions()}
      </MediaBox>  
    );
  },

  renderActions() {
    if (!this.props.loading) {
      return <MediaBoxActions onDelete={this.props.onDelete} />;
    }
  }
});

export default EditorEmbedLoaded;