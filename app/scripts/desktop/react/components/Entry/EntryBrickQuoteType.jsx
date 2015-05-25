import EntryBrickMetabar from './EntryBrickMetabar';

let EntryBrickQuoteType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      source: React.PropTypes.string,
      entry_url: React.PropTypes.string.isRequired
    }).isRequired
  },

  render() {
    return (
      <span>
        <div className="brick__body">
          <a href={this.props.entry.entry_url} className="brick__link">
            <blockquote className="blockquote">
              <span className="laquo">«</span>{this.props.entry.text}<span className="raquo">»</span>
              {this.renderQuoteSource()}
            </blockquote>
          </a>
        </div>
        <div className="brick__meta">
          <EntryBrickMetabar
              author={this.props.entry.author}
              rating={this.props.entry.rating}
              commentsCount={this.props.entry.comments_count}
              url={this.props.entry.entry_url} />
        </div>
      </span>
    );
  },

  renderQuoteSource() {
    if (this.props.entry.source) {
      return (
        <span className="blockquote__caption">—
          <span className="blockquote__source">
            <i>{this.props.entry.source}</i>
          </span>
        </span>
      );
    }
  }
});

export default EntryBrickQuoteType;