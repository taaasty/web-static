import EntryActionCreators from '../../actions/Entry';
import EntryBrickContent from './EntryBrickContent';

const ENTRY_TEXT_TYPE = 'text',
      ENTRY_IMAGE_TYPE = 'image',
      ENTRY_VIDEO_TYPE = 'video',
      ENTRY_QUOTE_TYPE = 'quote',
      ENTRY_ANONYMOUS_TYPE = 'anonymous';

let EntryBrick = React.createClass({
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    moderation: React.PropTypes.object
  },

  getInitialState() {
    return {
      visible: true,
      hasModeration: !!this.props.moderation
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.hasModeration != nextState.hasModeration ||
      this.state.visible != nextState.visible
    );
  },

  render() {
    if (this.state.visible) {
      return (
        <article className={this.getBrickClasses()}>
          <EntryBrickContent
              entry={this.props.entry}
              hasModeration={this.state.hasModeration}
              onEntryAccept={this.acceptEntry}
              onEntryDecline={this.declineEntry} />
        </article>
      );
    } else {
      return null;
    }
  },

  getBrickClasses() {
    let typeClass;

    switch(this.props.entry.type) {
      case ENTRY_TEXT_TYPE: typeClass = 'text'; break;
      case ENTRY_IMAGE_TYPE: typeClass = 'image'; break;
      case ENTRY_VIDEO_TYPE: typeClass = 'video'; break;
      case ENTRY_QUOTE_TYPE: typeClass = 'quote'; break;
      case ENTRY_ANONYMOUS_TYPE: typeClass = 'anonymous'; break;
      default: typeClass = 'text';
    }

    return `brick brick--${typeClass}`;
  },

  acceptEntry() {
    EntryActionCreators.accept(this.props.moderation.accept_url)
      .then(() => {
        let { accept_action } = this.props.moderation;

        if (this.isMounted()) {
          switch(accept_action) {
            case 'delete':
              this.setState({visible: false, hasModeration: false});
              break;
            case 'nothing':
              this.setState({hasModeration: false});
              break;
          }
        }
      });
  },

  declineEntry() {
    EntryActionCreators.decline(this.props.moderation.decline_url)
      .then(() => {
        let { decline_action } = this.props.moderation;

        if (this.isMounted()) {
          switch(decline_action) {
            case 'delete':
              this.setState({visible: false, hasModeration: false});
              break;
            case 'nothing':
              this.setState({hasModeration: false});
              break;
          }
        }
      });
  }
});

export default EntryBrick;