import EntryBrickMetabar from './EntryBrickMetabar';

let EntryBrickUnknownType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      rating: React.PropTypes.object.isRequired,
      author: React.PropTypes.object.isRequired,
      entry_url: React.PropTypes.string.isRequired,
      comments_count: React.PropTypes.number.isRequired
    }).isRequired
  },

  render() {
    return (
      <span>
        <div className="brick__body">
          {this.renderBrickTitle()}
          <div className="brick__text">
            <a href={this.props.entry.entry_url} title={this.props.entry.title} className="brick__link">
              Неизвестный тип записи
            </a>
          </div>
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

  renderBrickTitle() {
    if(this.props.entry.title) {
      return (
        <a href={this.props.entry.entry_url} title={this.props.entry.title} className="brick__link">
          <h2 className="brick__title">{this.props.entry.title}</h2>
        </a>
      );
    }
  }
});

export default EntryBrickUnknownType;