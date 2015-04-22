import CurrentUserStore from '../../stores/current_user';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import AvatarToolbar from './AvatarToolbar';

let AvatarToolbarContainer = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    userLogged: React.PropTypes.bool.isRequired
  },

  render() {
    return this.props.userLogged ? <AvatarToolbar user={this.props.user} /> : null;
  }
});

AvatarToolbarContainer = connectToStores(AvatarToolbarContainer, [CurrentUserStore], (props) => ({
  user: CurrentUserStore.getUser(),
  userLogged: CurrentUserStore.isLogged()
}));

export default AvatarToolbarContainer;