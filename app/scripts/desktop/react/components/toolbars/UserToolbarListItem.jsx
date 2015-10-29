import React, { PropTypes } from 'react';
import classNames from 'classnames';

const MAX_BADGE_COUNT = 99;
const MAX_BADGE_PRESENTATION = `${MAX_BADGE_COUNT}+`;

let UserToolbarListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    badgeCount: React.PropTypes.number,
    badgeClassName: React.PropTypes.string,
    stayOpen: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getInitialState() {
    return {
      opened: false,
    };
  },

  componentDidMount() {
    $(this.refs.link.getDOMNode()).tooltip({
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
    $(this.refs.link.getDOMNode()).tooltip('destroy');
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
    const tChildren = React.Children.map(children, (child) => {
      return React.cloneElement(child, { opened });
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
    if (this.props.label) {
      return (
        <span className={classNames('toolbar__label', this.props.labelClassName)}>
          {this.props.label}
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
      this.props.onClick();
    } else if (this.state.opened || !this.props.children) {
      // We will make redirect if item has no children, or it has been opened
      window.location = this.props.url;
    }
  },
});

export default UserToolbarListItem;
