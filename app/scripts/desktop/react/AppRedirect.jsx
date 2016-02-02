import React, { Component, PropTypes } from 'react';

class AppRedirect extends Component {
  componentWillMount() {
    if (this.props.route.path === '~anonymous') {
      window.location.href = '/live/anonymous';
    }
  }
  render() {
    return <noscript />;
  }
}

AppRedirect.propTypes = {
  route: PropTypes.object.isRequired,
};

export default AppRedirect;
