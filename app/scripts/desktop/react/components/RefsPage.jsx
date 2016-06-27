/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Auth from './Auth';
import { setBodyLayoutClassName } from '../helpers/htmlHelpers';

class RefsPage extends Component {
  componentWillMount() {
    setBodyLayoutClassName('layout--tech');
  }
  render() {
    const { params: { token }, route: { refUsername } } = this.props;

    return (
      <div className="page">
        <div className="page__inner">
          <div className="page__paper">
            <div className="page-cover js-cover" style={{ backgroundImage: 'url(/images/bg.jpg)' }} />
            <div className="page-body">
              <div className="layout-outer">
                <Helmet title={i18n.t('inviter.title')} />
                <div className="inviter-center-container">
                  <Auth refUsername={refUsername} token={token} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RefsPage.propTypes = {
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default RefsPage;
