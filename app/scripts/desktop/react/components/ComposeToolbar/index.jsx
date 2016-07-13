/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Routes from '../../../../shared/routes/routes';
import ComposeToolbarDropdownList from './ComposeToolbarDropdownList';
import FlowCreatorPopup from '../FlowCreatorPopup';
import { Link } from 'react-router';
import uri from 'urijs';

class ComposeToolbar extends Component {
  state = {
    isDropdownVisible: false,
    isFlowCreatorPopupVisible: false,
  };
  componentDidMount() {
    $(this.refs.button).tooltip({
      title: i18n.t('toolbar_new_entry_item'),
      placement: 'left',
      container: '.toolbar--compose',
    });
  }
  componentWillUnmount() {
    $(this.refs.button).tooltip('destroy');
  }
  onMouseEnter() {
    this.setState({ isDropdownVisible: true });
  }
  onMouseLeave() {
    this.setState({ isDropdownVisible: false });
  }
  showFlowCreatorPopup() {
    this.setState({
      isDropdownVisible: false,
      isFlowCreatorPopupVisible: true,
    });
  }
  hideFlowCreatorPopup() {
    this.setState({ isFlowCreatorPopupVisible: false });
  }
  render() {
    const { tlog, user } = this.props;
    const { isDropdownVisible, isFlowCreatorPopupVisible } = this.state;
    const containerClasses = classNames({
      'toolbar': true,
      'toolbar--compose': true,
      'state--open': isDropdownVisible,
    });

    return (
      <div
        className={containerClasses}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
      >
        <Link to={uri(Routes.new_entry_url(user.slug)).path()}>
          <div className="toolbar__toggle" ref="button">
            <i className="icon icon--plus" />
          </div>
        </Link>
        <ComposeToolbarDropdownList
          isFlow={tlog.get('isFlow', false)}
          showFlowCreatorPopup={this.showFlowCreatorPopup.bind(this)}
          tlogSlug={tlog.get('slug', '')}
          userSlug={user.slug}
        />
        {isFlowCreatorPopupVisible && <FlowCreatorPopup onClose={this.hideFlowCreatorPopup.bind(this)} />}
      </div>
    );
  }
}

ComposeToolbar.propTypes = {
  tlog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

ComposeToolbar.defaultProps = {
  tlog: {},
  user: {},
};

export default ComposeToolbar;
