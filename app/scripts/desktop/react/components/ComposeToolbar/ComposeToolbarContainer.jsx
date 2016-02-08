import React, { Component, PropTypes } from 'react';
import CurrentUserStore from '../../stores/current_user';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import ComposeToolbar from './index';

class _ComposeToolbarContainer extends Component {
  render() {
    const { user, isLogged } = this.props;

    return  isLogged ? <ComposeToolbar user={user} /> : null;
  }
}

_ComposeToolbarContainer.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const ComposeToolbarContainer = connectToStores(
  _ComposeToolbarContainer,
  [ CurrentUserStore ],
  () => ({
    user: CurrentUserStore.getUser(),
    isLogged: CurrentUserStore.isLogged(),
  })
);

export default ComposeToolbarContainer;
