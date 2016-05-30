import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class RefsPage extends Component {
  render() {
    const title = 'Регистрация по приглашению';
    const { token } = this.props.params;

    return (
      <div className="page__inner">
        <div className="page__paper">
          <div className="page-body">
            <div className="layout-outer">
              <Helmet title={title} />
              <Auth token={token} />
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

export default RefsPage;
