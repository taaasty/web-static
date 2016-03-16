/*global $ */
import React, { Component, PropTypes } from 'react';

class UserToolbarSubListItem extends Component {
  componentDidMount() {
    $(this.refs.link).tooltip({
      title: this.props.title,
      placement: 'right',
      container: '.toolbar--main',
    });
  }
  componentWillUnmount() {
    $(this.refs.link).tooltip('destroy');
  }
  handleClick() {
    const { children, onClick, url } = this.props;

    // When we tap on iOS, at first time triggers hover event, and only after
    // second tap we finally make the click. In this case we listen tap event,
    // and force execution underlying event at the moment
    if (typeof onClick === 'function') {
      onClick();
    } else if (!children) {
      // Unless list item has children, make redirect, otherwise allow trigger hover
      // event, which open subnav list
      window.location = url;
    }
  }
  render() {
    const { icon, title } = this.props;

    return (
      <li className="toolbar__subnav-item">
        <a
          className="toolbar__subnav-link"
          onTouchTap={this.handleClick.bind(this)}
          ref="link"
        >
          <i className={`icon ${icon}`} />
          <span className="toolbar__subnav-text">
            {title}
          </span>
        </a>
      </li>
    );
  }
}

UserToolbarSubListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default UserToolbarSubListItem;
