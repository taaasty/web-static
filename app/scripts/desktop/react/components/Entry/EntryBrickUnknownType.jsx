import EntryBrickMetabar from './EntryBrickMetabar';

let EntryBrickUnknownType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      rating: React.PropTypes.object.isRequired,
      tlog: React.PropTypes.object.isRequired,
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
              {i18n.t('entry.unknown_type')}
            </a>
          </div>
        </div>
        <div className="brick__meta">
          <EntryBrickMetabar
              tlog={this.props.entry.tlog}
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