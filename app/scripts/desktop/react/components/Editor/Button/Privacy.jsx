/*global i18n, $ */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class EditorPrivacyButton extends Component {
  componentDidMount() {
    this.$button = $(this.refs.container);
    this.setTooltip();
}
  componentDidUpdate() {
    this.$button.tooltip('destroy');
    this.setTooltip();
  }
  componentWillUnmount() {
    this.$button.tooltip('destroy');
  }
  setTooltip() {
    this.$button.tooltip({ placement: 'bottom', title: this.getTitle() });
  }
  getTitle() {
    const { isLive, isPrivate } = this.props;

    if (isPrivate) {
      return i18n.t('editor_private_entry');
    } else if (isLive) {
      return i18n.t('editor_public_with_voting_entry');
    } else {
      return i18n.t('editor_public_entry');
    }
  }
  handleClick() {
    this.$button.tooltip('hide');
    this.props.onClick();
}
  render() {
    const { isPrivate } = this.props;
    const iconClasses = classNames('icon', {
      'icon--unlock': !isPrivate,
      'icon--lock': isPrivate,
    });

    return (
      <button
        className="button button--outline-grey post-settings-button"
        onClick={this.handleClick.bind(this)}
        ref="container"
        title={this.getTitle()}
      >
        <span className={iconClasses} />
      </button>
    );
  }
}

EditorPrivacyButton.propTypes = {
      isLive: PropTypes.bool.isRequired,
      isPrivate: PropTypes.bool.isRequired,
      onClick: PropTypes.func.isRequired,
};

export default EditorPrivacyButton;
