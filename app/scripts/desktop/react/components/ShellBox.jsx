/*global ReactUnmountMixin, Mousetrap */
import React, { Children, cloneElement, createClass } from 'react';

const ShellBox = createClass({
  mixins: [ ReactUnmountMixin ],

  getDefaultProps() {
    return {
      fadeSpeed: 1000,
    };
  },

  getInitialState() {
    return {
      isDisabled: false,
    };
  },

  handleClick(ev) {
    if (!this.state.isDisabled) {
      if (ev.target.classList.contains('shellbox__cell')) {
        ev.preventDefault();
        this.unmount();
      }
    }
  },

  componentWillMount() {
    this.blurScreen();
    Mousetrap.bind('esc', this.onClose);
  },
  
  componentWillUnmount() {
    this.unblurScreen();
    Mousetrap.unbind('esc', this.onClose);
  },

  blurScreen() {
    // TODO Можно ли как-то избавиться от класса в html?
    // см http://facebook.github.io/react/docs/animation.html
    document.documentElement.classList.add('shellbox-enabled');
  },

  unblurScreen() {
    document.documentElement.classList.remove('shellbox-enabled');
  },

  onClose() {
    if (!this.state.isDisabled) {
      this.unmount();
    }
  },

  disableShellbox() {
    this.setState({ isDisabled: true });
  },

  enableShellbox() {
    this.setState({ isDisabled: false });
  },

  render() {
    const children = Children.map(
      this.props.children,
      (child) => cloneElement(child, {
        disableShellbox: this.disableShellbox,
        enableShellbox: this.enableShellbox,
        closeShellbox: this.onClose,
      })
    );

    return (
      <div className="shellbox">
        <div className="shellbox__main">
          <div className="shellbox__cell" onClick={this.handleClick}>
            {children}
          </div>
        </div>
      </div>
    );
  },
});

export default ShellBox;
