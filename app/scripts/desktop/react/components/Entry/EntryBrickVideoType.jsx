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
    if (this.props.entry.iframely.meta.site !== 'Instagram') {
      return <div className="video__overlay" />;
    }
    return null;
  },

  getVideoStyles() {
    let styles = {};

    switch(this.props.entry.iframely.meta.site) {
      case 'Instagram':
        styles.height = 302;
        break;
      default:
        if (this.props.entry.iframely.links.thumbnail) {
          styles.height = this.props.entry.iframely.links.thumbnail[0].media.height;
        }
        break;
    }

    return styles;
  },

  getCoverStyles() {
    let styles = {};

    switch(this.props.entry.iframely.meta.site) {
      case 'Instagram':
        if (this.props.entry.iframely.links.thumbnail) {
          styles.backgroundImage = `url("${this.props.entry.iframely.links.thumbnail[1].href}")`;
        }
        break;
      default:
        if (this.props.entry.iframely.links.thumbnail) {
          styles.backgroundImage = `url("${this.props.entry.iframely.links.thumbnail[0].href}")`;
        }
        break;
    }

    return styles;
  }
});

export default EntryBrickVideoType;