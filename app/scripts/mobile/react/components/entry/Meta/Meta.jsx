import EntryMetaVoting from './MetaVoting';
import EntryMetaActions from './MetaActions';
import EntryMetaComments from './MetaComments';
import EntryMetaDate from './MetaDate';

let EntryMeta = React.createClass({
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    commentsCount: React.PropTypes.number.isRequired,
    onMetaCommentsClick: React.PropTypes.func.isRequired
  },

  render() {
    return(
      <div className="post__meta">
        <EntryMetaActions entry={this.props.entry} />
        {this.renderVoting()}
        <EntryMetaComments
            commentsCount={this.props.commentsCount}
            onClick={this.props.onMetaCommentsClick} />
        <EntryMetaDate
            date={this.props.entry.created_at}
            entryUrl={this.props.entry.entry_url} />
      </div>
    );
  },

  renderVoting() {
    if (this.props.entry.is_voteable) {
      return (
        <EntryMetaVoting
            rating={this.props.entry.rating}
            entryId={this.props.entry.id} />
      );
    }
  }
});

export default EntryMeta;