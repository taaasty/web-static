import Text from '../../../../../shared/react/components/common/Text';
import Image from '../../../../../shared/react/components/common/Image';
import EntryBrickMetabar from './EntryBrickMetabar';
import EntryBrickActions from './EntryBrickActions';

const brickWidth = 302;

let EntryBrickImageType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      title_truncated: React.PropTypes.string.isRequired,
      preview_image: React.PropTypes.object.isRequired,
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
          <a href={this.props.entry.url} className="brick__link">
            {this.renderBrickImage()}
          </a>
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

  renderBrickImage() {
    if (this.props.entry.preview_image) {
      return <Image image={this.props.entry.preview_image} maxWidth={brickWidth} />;
    } else {
      return <span>{i18n.t('entry.has_no_images')}</span>;
    }
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
  }
});

export default EntryBrickImageType;