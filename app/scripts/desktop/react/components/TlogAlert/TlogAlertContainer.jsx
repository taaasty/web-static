import CurrentUserStore from '../../stores/current_user';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import TlogAlert from './TlogAlert';

let TlogAlertContainer = React.createClass({
  propTypes: {
    userPrivate: React.PropTypes.bool.isRequired
  },

  render() {
    if (this.props.userPrivate) {
      return (
        <TlogAlert text={i18n.t('tlog_alert_user_private')} />
      );
    } else {
      return null;
    }
  }
});

TlogAlertContainer = connectToStores(TlogAlertContainer, [CurrentUserStore], (props) => ({
  userPrivate: CurrentUserStore.isPrivate()
}));

export default TlogAlertContainer;