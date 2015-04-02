import classSet from 'react/lib/cx';
import EditorTypeSwitcherItem from './TypeSwitcherItem';

let AVAILABLE_TYPES = ['text', 'image', 'instagram', 'music', 'video', 'quote'];
let ENTRY_TYPES = {
  text: {
    title: () => i18n.t('editor_text_type'),
    icon: 'icon--text-circle'
  },
  anonymous: {
    title: () => i18n.t('editor_anonymous_type'),
    icon: 'icon--text-circle'
  },
  image: {
    title: () => i18n.t('editor_image_type'),
    icon: 'icon--image-circle'
  },
  instagram: {
    title: () => i18n.t('editor_instagram_type'),
    icon: 'icon--instagram-circle'
  },
  music: {
    title: () => i18n.t('editor_music_type'),
    icon: 'icon--music-circle'
  },
  video: {
    title: () => i18n.t('editor_video_type'),
    icon: 'icon--video-circle'
  },
  quote: {
    title: () => i18n.t('editor_quote_type'),
    icon: 'icon--quote-circle'
  }
};

let EditorTypeSwitcher = React.createClass({
  propTypes: {
    entryType: React.PropTypes.string.isRequired,
    canChangeType: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    onChangeType: React.PropTypes.func.isRequired
  },

  render() {
    let switcherClasses = classSet({
      'nav-types': true,
      'state--loading': this.props.loading
    });

    return (
      <nav className={switcherClasses}>
        {this.renderListItems()}
      </nav>
    );
  },

  renderListItems() {
    let listItems;

    if (this.props.canChangeType) {
      listItems = AVAILABLE_TYPES.map((type) =>
        <EditorTypeSwitcherItem
            title={ENTRY_TYPES[type].title()}
            icon={ENTRY_TYPES[type].icon}
            active={this.props.entryType === type}
            onClick={this.changeType.bind(null, type)}
            key={type} />
      );
    } else {
      listItems = <EditorTypeSwitcherItem
          title={ENTRY_TYPES[this.props.entryType].title()}
          icon={ENTRY_TYPES[this.props.entryType].icon}
          active={true} />
    }

    return listItems;
  },

  changeType(type) {
    if (this.props.loading) { return; }
    this.props.onChangeType(type);
  }
});

export default EditorTypeSwitcher;