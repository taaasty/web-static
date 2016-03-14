/*global $ */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import uri from 'urijs';

class EditorTypeSwitcherItem extends Component {
  componentDidMount() {
    $(this.refs.button).tooltip();
  }
  componentWillUnmount() {
    $(this.refs.button).tooltip('destroy');
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
        <Link to={{ pathname: '', hash: `#${type}` }}>
          <i className={`icon ${icon}`} />
        </Link>
      </button>
    );
  }
}

EditorTypeSwitcherItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default EditorTypeSwitcherItem;
