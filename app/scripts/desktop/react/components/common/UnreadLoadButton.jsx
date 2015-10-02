/*global i18n */
import React, { findDOMNode, Component, PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  count: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
};

class UnreadLoadButton extends Component {
  state = {
    offScreen: false,
  }
  componentDidMount() {
    this.container = findDOMNode(this.refs.container);
    if (this.container) {
      this.onScrollFn = this.updateOffScreenState.bind(this);
      this.offsetTop = this.container.getBoundingClientRect().top;
      document.addEventListener('scroll', this.onScrollFn, false);
    }
  }
  componentWillUnmount() {
    if (this.onScrollFn) {
      document.removeEventListener('scroll', this.onScrollFn);
    };
  }
  updateOffScreenState() {
    const scrollTop = document.body.scrollTop || // safary, chrome
          document.documentElement.scrollTop;    // ie, mozilla
    this.setState({
      offScreen: (this.offsetTop && scrollTop > this.offsetTop),
    });
  }
  render() {
    const { count, href } = this.props;
    const containerClasses = classNames({
      'unread-load-button-container': true,
      'unread-load-button-container--fixed': this.state.offScreen,
      'unread-load-button-container--hidden': (count || 0) < 1,
    });

    return (
      <div className={containerClasses} ref="container">
        <div className="unread-load-button">
          {i18n.t('buttons.unread_load.unread_entries_count', { count })}
          <a href={href}>
            {i18n.t('buttons.unread_load.show_unread')}
          </a>
        </div>
      </div>
    );
  }
}

UnreadLoadButton.propTypes = propTypes;

export default UnreadLoadButton;
