/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Routes from '../../../../shared/routes/routes';
import ComposeToolbarDropdownList from './ComposeToolbarDropdownList';

class ComposeToolbar extends Component {
  state = {
    dropdownVisible: false,
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
    this.setState({ dropdownVisible: true });
  }
  onMouseLeave() {
    this.setState({ dropdownVisible: false });
  }
  render() {
    const { tlog, user } = this.props;
    const containerClasses = classNames({
      'toolbar': true,
      'toolbar--compose': true,
      'state--open': this.state.dropdownVisible,
    });

    return (
      <div
        className={containerClasses}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
      >
        <a href={Routes.new_entry_url(this.props.user.slug)}>
          <div className="toolbar__toggle" ref="button">
            <i className="icon icon--plus" />
          </div>
        </a>
        <ComposeToolbarDropdownList
          isFlow={tlog.is_flow}
          tlogSlug={tlog.slug}
          userSlug={user.slug}
        />
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
