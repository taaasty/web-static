import Text from '../../../../shared/react/components/common/Text';
import CollageManager from '../../../../shared/react/components/common/collage/collageManager';
import EntryBrickMetabar from './EntryBrickMetabar';

let EntryBrickImageType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      image_url: React.PropTypes.string,
      image_attachments: React.PropTypes.array.isRequired,
      rating: React.PropTypes.object.isRequired,
      author: React.PropTypes.object.isRequired,
      entry_url: React.PropTypes.string.isRequired,
      comments_count: React.PropTypes.number.isRequired
    }).isRequired
  },

  render() {
    return (
      <span>
        <div className="brick__media">
          <a href={this.props.entry.entry_url} className="brick__link">
            {this.renderBrickImage()}
          </a>
        </div>
        {this.renderBrickBody()}
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

  renderBrickImage() {
    if (this.props.entry.image_attachments) {
      let imageList = this.props.entry.image_attachments.map((attachment) => {
        let { image } = attachment;

        return {
          width: image.geometry.width,
          height: image.geometry.height,
          payload: {
            id: attachment.id,
            url: image.url,
            path: image.path,
            title: image.title
          }
        };
      });

      return <CollageManager images={imageList} width={302} />;
    } else if (this.props.entry.image_url) {
      return <img src={this.props.entry.image_url} maxWidth={302} />;
    } else {
      return <span>У записи нет изображений</span>;
    }
  },

  renderBrickBody() {
    if (this.props.entry.title) {
      return (
        <div className="brick__body">
          <div className="brick__text">
            <a href={this.props.entry.entry_url} title={this.props.entry.title} className="brick__link">
              <Text value={this.props.entry.title} withHTML={true} />
            </a>
          </div>
        </div>
      );
    }
  }
});

export default EntryBrickImageType;