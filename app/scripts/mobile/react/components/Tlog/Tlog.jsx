import CurrentUserStore from '../../stores/currentUser';
import ConnectStoreMixin from '../../../../shared/react/mixins/connectStore';
import TlogEmptyPage from './TlogEmptyPage';
import TlogOwnEmptyPage from './TlogOwnEmptyPage';
import EntryTlog from '../entry/Tlog';

let Tlog = React.createClass({
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
    let listItems = this.props.entries.map((entry) => <EntryTlog entry={entry} key={entry.id} isInList={true} />)

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
      emptyPage = <TlogOwnEmptyPage userSlug={this.state.user.slug} />;
    } else {
      emptyPage = <TlogEmptyPage />;
    }

    return emptyPage;
  },

  getStateFromStore() {
    return {
      user: CurrentUserStore.getUser()
    }
  }
});

export default Tlog;
