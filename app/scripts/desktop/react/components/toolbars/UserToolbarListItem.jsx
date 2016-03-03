/*global $ */
import React, { Children, Component, PropTypes, cloneElement } from 'react';
import { Link } from 'react-router';
import uri from 'urijs';
import classNames from 'classnames';

const MAX_BADGE_COUNT = 99;
const MAX_BADGE_PRESENTATION = `${MAX_BADGE_COUNT}+`;

class UserToolbarListItem extends Component {
  state = { opened: false };
  componentDidMount() {
    $(this.refs.link).tooltip({
      title: this.props.title,
      placement: 'right',
      container: '.toolbar--main',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.stayOpen && this.state.opened) {
      this.setState({opened: false});
    }
  }
  componentWillUnmount() {
    $(this.refs.link).tooltip('destroy');
  }
  handleMouseEnter() {
    if (this.props.children) {
      this.setState({ opened: true });
    }
  }
  handleMouseLeave() {
    if (!this.props.stayOpen) {
      this.setState({opened: false});
    }
  }
  handleClick(ev) {
    const { children, onClick } = this.props;
    ev.stopPropagation();

    if (typeof onClick === 'function') {
      onClick(ev);
    } else if (!this.state.opened && children) {
      ev.preventDefault();
    }
  }
  renderBadge() {
    const { badgeClassName, badgeCount } = this.props;

    if (badgeCount) {
      return (
        <span className={badgeClassName}>
          {badgeCount > MAX_BADGE_COUNT ? MAX_BADGE_PRESENTATION : badgeCount}
        </span>
      );
    }
  }
  renderLabel() {
    const { badgeCount, label, labelClassName } = this.props;

    if (!badgeCount && label) {
      return (
        <span className={classNames('toolbar__label', labelClassName)}>
          {label}
        </span>
      );
    }
  }
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
  }
  render() {
    const { children, icon, url } = this.props;
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
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <Link
          className="toolbar__nav-link"
          onClick={this.handleClick.bind(this)}
          to={url ? uri(url).path() : '.'}
        >
          <div ref="link">
            {icon ? this.renderIcon() : tChildren}
          </div>
        </Link>
      </li>
    );
  }
}

UserToolbarListItem.propTypes = {
  badgeClassName: PropTypes.string,
  badgeCount: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  icon: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  onClick: PropTypes.func,
  stayOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default UserToolbarListItem;
