/*global $ */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const MARGIN_BETWEEN_TOGGLE_AND_MENU = 20;

class DropdownActions extends Component {
  state = {
    marginTop: MARGIN_BETWEEN_TOGGLE_AND_MENU,
    open: false,
  };
  componentDidMount() {
    if (this.state.open) {
      this.calculateTopPosition();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.open !== nextState.open) {
      this.calculateTopPosition();
    }
  }
  calculateTopPosition() {
    const wHeight = $(window).height();
    const wScrollTop = $(window).scrollTop();
    const $menu = $(this.refs.menu);
    const menuHeight = $menu.innerHeight();
    const menuOffset = $menu.offset();

    let menuScrollTopWindow = menuOffset.top - wScrollTop;
    let marginTop = MARGIN_BETWEEN_TOGGLE_AND_MENU / 2;

    if (this.state.marginTop != marginTop) {
      menuScrollTopWindow = menuScrollTopWindow - this.state.marginTop;
    }

    if (menuScrollTopWindow + menuHeight > wHeight) {
      marginTop = (menuHeight + MARGIN_BETWEEN_TOGGLE_AND_MENU) / -1;
    }

    this.setState({ marginTop });
  }
  setOpen() {
    this.setState({ open: true });
  }
  setClose() {
    this.setState({ open: false });
  }
  render() {
    const { marginTop, open } = this.state;
    const menuClasses = classnames({
      'meta-item__dropdown': true,
      'state--open': open,
      'position-top': marginTop != MARGIN_BETWEEN_TOGGLE_AND_MENU / 2,
    });
    const menuStyles = {
      marginTop: marginTop,
    };

    return (
      <span className={this.props.className}>
        <span
            className="meta-item__content"
            onMouseEnter={this.setOpen.bind(this)}
            onMouseLeave={this.setClose.bind(this)}
        >
          {this.props.item}
          <span className={menuClasses} style={menuStyles} ref="menu">
            {this.props.children}
          </span>
        </span>
      </span>
    );
  }
}

DropdownActions.propTypes = {
  className: PropTypes.string,
  item: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
};

DropdownActions.defaultProps = {
  className: 'meta-item meta-item--actions',
  item: <i className="meta-item__common icon icon--dots" />,
};

export default DropdownActions;
