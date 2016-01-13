/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from '../../../../shared/react/components/common/Spinner';

const propTypes = {
  count: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

class UnreadLoadButton extends Component {
  state = {
    offScreen: false,
  };
  componentDidMount() {
    this.container = this.refs.container;
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
  onClick(ev) {
    const { onClick: propsOnClick } = this.props; //FIXME: check later for babel fix

    if (propsOnClick) {
      ev.preventDefault();
      return propsOnClick();
    }
  }
  render() {
    const { count, href, isLoading } = this.props;
    const containerClasses = classNames({
      'unread-load-button-container': true,
      'unread-load-button-container--fixed': this.state.offScreen,
      'unread-load-button-container--hidden': (count || 0) < 1,
    });

    return (
      <div className={containerClasses} ref="container">
        <div className="unread-load-button">
          {
            isLoading
              ? <Spinner size={14} />
              : <span>
                  {i18n.t('buttons.unread_load.unread_entries_count', { count })}
                  <a href={href} onClick={this.onClick.bind(this)}>
                    {i18n.t('buttons.unread_load.show_unread')}
                  </a>
                </span>
          }
        </div>
      </div>
    );
  }
}

UnreadLoadButton.propTypes = propTypes;

export default UnreadLoadButton;
