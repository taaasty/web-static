import React, { Component, PropTypes } from 'react';
import CurrentUserStore from '../../stores/current_user';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import ComposeToolbar from './ComposeToolbar';

class _ComposeToolbarContainer extends Component {
  render() {
    const { user, userLogged } = this.props;

    return  userLogged ? <ComposeToolbar user={user} /> : null;
  }
}

_ComposeToolbarContainer.propTypes = {
  user: PropTypes.object.isRequired,
  userLogged: PropTypes.bool.isRequired,
};

const ComposeToolbarContainer = connectToStores(
  _ComposeToolbarContainer,
  [ CurrentUserStore ],
  () => ({
    user: CurrentUserStore.getUser(),
    userLogged: CurrentUserStore.isLogged(),
  })
);

export default ComposeToolbarContainer;
