import React, { cloneElement, Children, PropTypes } from 'react';
import classNames from 'classnames';

const MAX_BADGE_COUNT = 99;
const MAX_BADGE_PRESENTATION = `${MAX_BADGE_COUNT}+`;

let UserToolbarListItem = React.createClass({
  propTypes: {
    badgeCount: PropTypes.number,
    badgeClassName: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    stayOpen: PropTypes.bool,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  },

  getInitialState() {
    return {
      opened: false,
    };
  },

  componentDidMount() {
    $(this.refs.link).tooltip({
      title: this.props.title,
      placement: 'right',
      container: '.toolbar--main',
    });
  },

  componentWillReceiveProps(nextProps) {
    if (!nextProps.stayOpen && this.state.opened) {
      this.setState({opened: false});
    }
  },

  componentWillUnmount() {
    $(this.refs.link).tooltip('destroy');
  },

  renderIcon() {
    const { icon, title } = this.props;

    return (
      <div>
        <i className={`icon ${icon}`} />
        <span className="toolbar__nav-text">
          {title}
        </span>
        {this.renderLabel()}
        {this.renderBadge()}
      </div>
    );
  },
  
  render() {
    const { children, icon } = this.props;
    const { opened } = this.state;
    const tChildren = Children.map(children, (child) => {
      return cloneElement(child, { opened });
    });

    const itemClasses = classNames('toolbar__nav-item', {
      '__opened': opened,
    });

    return (
      <li
        className={itemClasses}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <a 
          className="toolbar__nav-link"
          onClick={this.handleClick}
          ref="link"
        >
          {icon ? this.renderIcon() : tChildren}
        </a>
      </li>
    );
  },

  renderBadge() {
    const { badgeClassName, badgeCount } = this.props;

    if (badgeCount) {
      return (
        <span className={badgeClassName}>
          {badgeCount > MAX_BADGE_COUNT ? MAX_BADGE_PRESENTATION : badgeCount}
        </span>
      );
    }
  },

  renderLabel() {
    const { badgeCount, label, labelClassName } = this.props;

    if (!badgeCount && label) {
      return (
        <span className={classNames('toolbar__label', labelClassName)}>
          {label}
        </span>
      );
    }
  },

  handleMouseEnter() {
    if (this.props.children) {
      this.setState({opened: true});
    }
  },

  handleMouseLeave() {
    if (!this.props.stayOpen) {
      this.setState({opened: false});
    }
  },

  handleClick(e) {
    e.stopPropagation();

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    } else if (this.state.opened || !this.props.children) {
      // We will make redirect if item has no children, or it has been opened
      window.location = this.props.url;
    }
  },
});

export default UserToolbarListItem;
