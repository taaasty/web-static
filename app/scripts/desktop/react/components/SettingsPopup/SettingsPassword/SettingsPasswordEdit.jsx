/*global i18n, setTimeout, clearTimeout */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NoticeService from '../../../services/Notice';

const CANCEL_TIMEOUT = 500;

class SettingsPasswordEdit extends Component {
  state = { hasInput: false };
  componentWillUnmount() {
    this.cancelTimeout = null;
  }
  isValid() {
    const password = this.refs.password.value;
    const passwordConfirm = this.refs.passwordConfirm.value;

    if (password.length === 0 && passwordConfirm.length === 0) {
      NoticeService.notifyError(i18n.t('settings_password_empty_error'));
      return false;
    } else if (password !== passwordConfirm) {
      NoticeService.notifyError(i18n.t('settings_password_arent_equals'));
      return false;
    }

    return true;
  }
  hasInput() {
    const passwordLength = this.refs.password.value.length;
    const passwordConfirmLength = this.refs.passwordConfirm.value.length;

    return (passwordLength > 0 && passwordConfirmLength > 0);
  }
  getButtonTitle() {
    return this.state.hasInput ? i18n.t('settings_password_save')
      : i18n.t('settings_password_cancel');
  }
  setCancelTimeout() {
    this.cancelTimeout = setTimeout(this.props.onEditCancel, CANCEL_TIMEOUT);
  }
  clearCancelTimeout() {
    if (this.cancelTimeout) {
      clearTimeout(this.cancelTimeout);
    }
  }
  handleButtonClick(ev) {
    const newPassword = this.refs.password.value;

    ev.preventDefault();    
    this.clearCancelTimeout();

    if (this.state.hasInput && this.isValid()) {
      this.props.onSubmit(newPassword);
    }
  }
  handleInputBlur() {
    this.setCancelTimeout();
  }
  handleInputFocus() {
    this.clearCancelTimeout();
  }
  handleInputChange() {
    this.setState({ hasInput: this.hasInput() });
  }
  handleInputKeyDown(ev) {
    const { onEditCancel, onSubmit } = this.props;
    const newPassword = ev.target.value;

    if (ev.key === 'Enter') {
      ev.preventDefault();
      if (this.isValid()) {
        onSubmit(newPassword);
      }
    } else if (ev.key === 'Escape') {
      ev.preventDefault();
      onEditCancel();
    }
  }
  render() {
    const { hasInput } = this.state;
    const buttonClasses = classNames('button', {
      'button--yellow': hasInput,
      'button--outline': !hasInput,
    });

    return (
      <div className="settings__item setting_item--full">
        <div className="settings__right">
          <button
            className={buttonClasses}
            onClick={this.handleButtonClick.bind(this)}
          >
            <span className="button__text">
              {this.getButtonTitle()}
            </span>
          </button>
        </div>
        <div className="settings__left">
          <h3 className="settings__title">
            {i18n.t('settings_password')}
          </h3>
          <div className="form-field form-field--default">
            <input
              autoFocus
              className="form-field__input"
              onBlur={this.handleInputBlur.bind(this)}
              onChange={this.handleInputChange.bind(this)}
              onFocus={this.handleInputFocus.bind(this)}
              onKeyDown={this.handleInputKeyDown.bind(this)}
              placeholder={i18n.t('settings_password_new')}
              ref="password"
              type="password"
            />
            <div className="form-field__bg" />
          </div>
          <div className="form-field form-field--default">
            <input
              className="form-field__input"
              onBlur={this.handleInputBlur.bind(this)}
              onChange={this.handleInputChange.bind(this)}
              onFocus={this.handleInputFocus.bind(this)}
              onKeyDown={this.handleInputKeyDown.bind(this)}
              placeholder={ i18n.t('settings_password_new_repeat') }
              ref="passwordConfirm"
              type="password"
            />
            <div className="form-field__bg" />
          </div>
        </div>
      </div>
    );
  }
}

SettingsPasswordEdit.propTypes = {
  onEditCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsPasswordEdit;
