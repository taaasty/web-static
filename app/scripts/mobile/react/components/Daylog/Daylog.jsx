import CurrentUserStore from '../../stores/currentUser';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import DaylogEmptyPage from './DaylogEmptyPage';
import DaylogOwnEmptyPage from './DaylogOwnEmptyPage';
import EntryTlog from '../entry/tlog';

let Daylog = React.createClass({
  mixins: [ConnectStoreMixin(CurrentUserStore)],

  propTypes: {
    tlog: React.PropTypes.object.isRequired,
    entries: React.PropTypes.array.isRequired
  },

  render() {
    let content;

    if (this.props.entries.length) {
      content = this.renderEntryList();
    } else {
      content = this.renderEmptyPage();
    }

    return content;
  },

  renderEntryList() {
    let listItems = this.props.entries.map((entry) => <EntryTlog entry={entry} key={entry.id} />)

    return (
      <div className="posts">
        {listItems}
      </div>
    );
  },

  renderEmptyPage() {
    const isLogged = this.state.user != null;
    let emptyPage;

    if (isLogged && this.props.tlog.author.id == this.state.user.id) {
      emptyPage = <DaylogOwnEmptyPage userSlug={this.state.user.slug} />;
    } else {
      emptyPage = <DaylogEmptyPage />;
    }

    return emptyPage;
  },

  getStateFromStore() {
    return {
      user: CurrentUserStore.getUser()
    }
  }
});

export default Daylog;