/*global ReactApp */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Auth from './Auth';

class RefsPage extends Component {
  componentDidMount() {
    ReactApp.shellbox.show(Auth, { token: this.props.params.token });
  }
  render() {
    const title = 'Регистрация по приглашению';

    return (
      <div className="page">
        <Helmet title={title} />
        <div className="page__inner">
          <div className="page__paper">
            <div className="page-cover js-cover" style={{ backgroundImage: 'url(/images/bg.jpg)' }} />
            <div className="page-body">
              <div className="layout-outer" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RefsPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default RefsPage;
