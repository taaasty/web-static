import Text from '../../../../shared/react/components/common/Text';
import Image from '../../../../shared/react/components/common/Image';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

const brickWidth = 302;

let EntryBrickVideoType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      title_truncated: React.PropTypes.string.isRequired,
      preview_image: React.PropTypes.object.isRequired,
      is_playable: React.PropTypes.bool.isRequired,
      tlog: React.PropTypes.object.isRequired,
      rating: React.PropTypes.object.isRequired,
      comments_count: React.PropTypes.number.isRequired
    }).isRequired,
    hasModeration: React.PropTypes.bool.isRequired,
    onEntryAccept: React.PropTypes.func.isRequired,
    onEntryDecline: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <span>
        <div className="brick__media">
          <figure className="video">
            <a href={this.props.entry.url}>
              <div className="video__cover">
                <Image image={this.props.entry.preview_image} maxWidth={brickWidth} />
                {this.renderVideoOverlay()}
              </div>
            </a>
          </figure>
        </div>
        {this.renderBrickBody()}
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

  renderBrickBody() {
    if (this.props.entry.title_truncated) {
      return (
        <div className="brick__body">
          <div className="brick__text">
            <a href={this.props.entry.url} title={this.props.entry.title_truncated} className="brick__link">
              <Text value={this.props.entry.title_truncated} withHTML={true} />
            </a>
          </div>
        </div>
      );
    }
  },

  renderVideoOverlay() {
    if (this.props.entry.is_playable) {
      return <div className="video__overlay" />;
    }
  }
});

export default EntryBrickVideoType;