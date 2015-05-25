import Text from '../../../../shared/react/components/common/Text';
import EntryBrickMetabar from './EntryBrickMetabar';

let EntryBrickVideoType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      iframely: React.PropTypes.object.isRequired,
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
          <figure className="video" style={this.getVideoStyles()}>
            <a href={this.props.entry.entry_url}>
              <div className="video__cover" style={this.getCoverStyles()}>
                {this.renderVideoOverlay()}
              </div>
            </a>
          </figure>
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
  },

  renderVideoOverlay() {
    let meta = this.props.entry.iframely.meta;

    if (meta && meta.site !== 'Instagram') {
      return <div className="video__overlay" />;
    }

    return null;
  },

  getVideoStyles() {
    let meta = this.props.entry.iframely.meta,
        links = this.props.entry.iframely.links,
        styles = {};

    if (meta && meta.site === 'Instagram') {
      styles.height = 302;
    } else if (links && links.thumbnail) {
      styles.height = (links.thumbnail[0].media.height <= 200) ? links.thumbnail[0].media.height : 200;
    }

    return styles;
  },

  getCoverStyles() {
    let meta = this.props.entry.iframely.meta,
        links = this.props.entry.iframely.links,
        styles = {};

    if (meta && meta.site === 'Instagram') {
      if (links && links.thumbnail) {
        styles.backgroundImage = `url("${links.thumbnail[1].href}")`;
      }
    } else if (links && links.thumbnail) {
      styles.backgroundImage = `url("${links.thumbnail[0].href}")`;
    }

    return styles;
  }
});

export default EntryBrickVideoType;