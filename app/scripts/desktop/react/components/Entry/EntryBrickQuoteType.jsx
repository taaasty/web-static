import EntryBrickMetabar from './EntryBrickMetabar';

let EntryBrickQuoteType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      text_truncated: React.PropTypes.string.isRequired,
      source: React.PropTypes.string,
      rating: React.PropTypes.object.isRequired,
      tlog: React.PropTypes.object,
      comments_count: React.PropTypes.number.isRequired
    }).isRequired
  },

  render() {
    return (
      <span>
        <div className="brick__body">
          <a href={this.props.entry.url} className="brick__link">
            <blockquote className="blockquote">
              <span className="laquo">«</span>{this.props.entry.text_truncated}<span className="raquo">»</span>
              {this.renderQuoteSource()}
            </blockquote>
          </a>
        </div>
        <div className="brick__meta">
          <EntryBrickMetabar
              tlog={this.props.entry.tlog}
              rating={this.props.entry.rating}
              commentsCount={this.props.entry.comments_count}
              url={this.props.entry.url} />
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