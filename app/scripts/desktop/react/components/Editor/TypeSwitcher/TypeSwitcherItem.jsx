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
    const { loading, location: { pathname }, type } = this.props;

    ev.preventDefault();
    if (!loading) {
      browserHistory.replace({ pathname, hash: !!type && `#${type}` });
    }
  }
  render() {
    const { active, icon, loading, title, type } = this.props;
    const itemClasses = classNames('button', 'button--circle', {
      'state--disable': loading,
      'state--active': active,
    });

    return (
      <button
        className={itemClasses}
        ref="button"
        title={title}
      >
        <a href={type ? `#${type}` : ''} onClick={this.handleClick.bind(this)}>
          <i className={`icon ${icon}`} />
        </a>
      </button>
    );
  }
}

EditorTypeSwitcherItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default EditorTypeSwitcherItem;
