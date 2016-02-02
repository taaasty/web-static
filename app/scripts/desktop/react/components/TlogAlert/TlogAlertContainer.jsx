import CurrentUserStore from '../../stores/current_user';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import TlogAlert from './TlogAlert';

const TYPES = [
  'owner_private_tlog', 'tlog_private', 'tlog_favorites', 'tlog_my_favorites'
];

let TlogAlertContainer = React.createClass({
  propTypes: {
    type: React.PropTypes.oneOf(TYPES).isRequired,
    userPrivate: React.PropTypes.bool.isRequired
  },

  render() {
    let { type, userPrivate } = this.props;

    if (type != null && TYPES.indexOf(type) != -1) {
      if (type != 'owner_private_tlog' || (type == 'owner_private_tlog' && userPrivate)) {
        return <TlogAlert text={i18n.t(`tlog_alert.${type}`)} />;
      }
    }

    return null;
  }
});

TlogAlertContainer = connectToStores(TlogAlertContainer, [CurrentUserStore], (props) => ({
  userPrivate: CurrentUserStore.isPrivate()
}));

export default TlogAlertContainer;