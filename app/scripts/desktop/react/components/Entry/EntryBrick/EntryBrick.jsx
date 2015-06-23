import EntryActionCreators from '../../../actions/Entry';
import EntryBrickContent from './EntryBrickContent';

const ENTRY_TYPES = [
  'text', 'image', 'video', 'quote', 'link', 'song', 'code'
];

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
    let { type } = this.props.entry;
    let typeClass = ENTRY_TYPES.indexOf(type) != -1 ? type : 'text';

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