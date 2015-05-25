import Text from '../../../../shared/react/components/common/Text';
import Image from '../common/Image';
import EntryBrickMetabar from './EntryBrickMetabar';

const brickWidth = 302;

let EntryBrickImageType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      title_truncated: React.PropTypes.string.isRequired,
      thumbnail: React.PropTypes.object.isRequired,
      tlog: React.PropTypes.object.isRequired,
      rating: React.PropTypes.object.isRequired,
      comments_count: React.PropTypes.number.isRequired
    }).isRequired
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
              url={this.props.entry.url} />
        </div>
      </span>
    );
  },

  renderBrickImage() {
    if (this.props.entry.thumbnail) {
      return <Image image={this.props.entry.thumbnail} maxWidth={brickWidth} />;
    } else {
      return <span>У записи нет изображений</span>;
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