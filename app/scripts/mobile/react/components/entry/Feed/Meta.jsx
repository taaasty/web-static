import EntryMetaAuthor from '../Meta/MetaAuthor';

let EntryFeedMeta = React.createClass({
  propTypes: {
    author: React.PropTypes.object.isRequired
  },

  render() {
    return(
      <div className="post__meta">
        <EntryMetaAuthor author={this.props.author} />
      </div>
    );
  }
});

export default EntryFeedMeta;