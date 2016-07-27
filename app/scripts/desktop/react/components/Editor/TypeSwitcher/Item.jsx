/*global $ */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

class EditorTypeSwitcherItem extends Component {
  componentDidMount() {
    $(this.refs.button).tooltip();
  }
  componentWillUnmount() {
    $(this.refs.button).tooltip('destroy');
  }
  handleClick(ev) {
    const { isFetching, pathname, type } = this.props;

    ev.preventDefault();
    if (!isFetching) {
      browserHistory.replace({ pathname, hash: !!type && `#${type}` });
    }
  }
  render() {
    const { active, icon, isFetching, title, type } = this.props;
    const itemClasses = classNames('button', 'button--circle', {
      'state--disable': isFetching,
      'state--active': active,
    });

    return (
      <button
        className={itemClasses}
        onClick={this.handleClick.bind(this)}
        ref="button"
        title={title}
      >
        <a href={type ? `#${type}` : ''}>
          <i className={`icon ${icon}`} />
        </a>
      </button>
    );
  }
}

EditorTypeSwitcherItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default EditorTypeSwitcherItem;
