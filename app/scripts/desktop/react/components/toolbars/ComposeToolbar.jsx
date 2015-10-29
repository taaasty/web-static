/*global i18n */
import React, { findDOMNode, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';

class ComposeToolbar {
  componentDidMount() {
    $(findDOMNode(this.refs.container)).tooltip({
      title: i18n.t('toolbar_new_entry_item'),
      placement: 'left',
      container: '.toolbar--compose'
    });
  }
  componentWillUnmount() {
    $(findDOMNode(this.refs.container)).tooltip('destroy');
  }
  render() {
    return (
      <a
        className="toolbar toolbar--compose"
        href={Routes.new_entry_url(this.props.user.slug)}
        ref="container"
      >
          <div className="toolbar__toggle">
            <i className="icon icon--plus" />
          </div>
      </a>
    );
  }
}

ComposeToolbar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ComposeToolbar;
