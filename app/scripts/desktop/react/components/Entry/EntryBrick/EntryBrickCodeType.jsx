import Text from '../../../../../shared/react/components/common/Text';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

let EntryBrickCodeType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      text_truncated: React.PropTypes.string.isRequired,
      rating: React.PropTypes.object.isRequired,
      tlog: React.PropTypes.object,
      comments_count: React.PropTypes.number.isRequired
    }).isRequired,
    hasModeration: React.PropTypes.bool.isRequired,
    onEntryAccept: React.PropTypes.func.isRequired,
    onEntryDecline: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <span>
        <div className="brick__body">
          {this.renderBrickTitle()}
          <div className="brick__text">
            <a href={this.props.entry.url} title={this.props.entry.title} className="brick__link">
              <pre>
                <Text value={this.props.entry.text_truncated} withHTML={true} />
              </pre>
            </a>
          </div>
        </div>
        <div className="brick__meta">
          <EntryBrickMetabar
              tlog={this.props.entry.tlog}
              rating={this.props.entry.rating}
              commentsCount={this.props.entry.comments_count}
              url={this.props.entry.url}
              entryID={this.props.entry.id} />
        </div>
        <EntryBrickActions
            hasModeration={this.props.hasModeration}
            onAccept={this.props.onEntryAccept}
            onDecline={this.props.onEntryDecline} />
      </span>
    );
  },

  renderBrickTitle() {
    if(this.props.entry.title) {
      return (
        <a href={this.props.entry.url} title={this.props.entry.title} className="brick__link">
          <h2 className="brick__title">{this.props.entry.title}</h2>
        </a>
      );
    }
  }
});

export default EntryBrickCodeType;