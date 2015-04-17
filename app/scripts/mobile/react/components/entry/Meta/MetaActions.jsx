import classnames from 'classnames';
import ClickOutsideMixin from '../../../mixins/clickOutside';
import EntryMetaActions_Button from './actions/buttons/button';
import EntryMetaActions_DropdownMenu from './actions/dropdownMenu';

const OPEN_STATE = 'open',
      CLOSE_STATE = 'close';

let EntryMetaActions = React.createClass({
  mixins: [ClickOutsideMixin],

  propTypes: {
    entry: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      currentState: CLOSE_STATE
    }
  },

  render() {
    let actionsClasses = classnames('meta-actions', {
      '__open': this.isOpenState()
    });

    return (
      <div className={actionsClasses}>
        <EntryMetaActions_Button onClick={this.toggleOpenState} />
        <EntryMetaActions_DropdownMenu entry={this.props.entry} visible={this.isOpenState()} />
      </div>
    );
  },

  isOpenState() {
    return this.state.currentState == OPEN_STATE;
  },

  activateCloseState() {
    this.setState({currentState: CLOSE_STATE});
  },

  activateOpenState() {
    this.setState({currentState: OPEN_STATE});
  },

  toggleOpenState() {
    this.isOpenState() ? this.activateCloseState() : this.activateOpenState();
  }
});

export default EntryMetaActions;