/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class SettingsEmailEdit extends Component {
  state = { email: this.props.email };
  componentDidMount() {
    this.refs.email.focus();
  }
  isValid() {
    return this.state.email.length >= 5;
  }
  handleButtonMouseDown() {
    const { email, onEditCancel, onSubmit } = this.props;
    const newEmail = this.refs.email.value;

    if (this.isValid() && email !== newEmail) {
      onSubmit(newEmail);
    } else {
      onEditCancel();
    }
  }
  handleButtonClick(ev) {
    ev.preventDefault();
  }
  handleInputKeyDown(ev) {
    const { onEditCancel, onSubmit } = this.props;
    const newEmail = ev.target.value;

    if (ev.key === 'Enter') {
      ev.preventDefault();
      onSubmit(newEmail);
    } else if (ev.key === 'Escape'){
      ev.preventDefault();
      onEditCancel();
    }
  }
  handleChange(ev) {
    this.setState({ email: ev.target.value });
  }
  handleFocus(ev) {
    const field = ev.target;

    if (field.setSelectionRange) {
      field.setSelectionRange(0, field.value.length);
    }
  }
  render() {
    const { email } = this.state;
    const { onEditCancel } = this.props;
    const isValid = this.isValid();
    const buttonClasses = classNames('button', {
      'button--yellow': isValid,
      'button--outline': !isValid,
    });

    return (
      <div className="settings__item settings__item--full">
        <div className="settings__right">
          <button
            className={buttonClasses}
            onClick={this.handleButtonClick.bind(this)}
            onMouseDown={this.handleButtonMouseDown.bind(this)}
            ref="saveButton"
          >
            <span className="button__text">
              {isValid ? i18n.t('settings_email_edit_save') : i18n.t('settings_email_edit_cancel')}
            </span>
          </button>
        </div>
        <div className="settings__left">
          <h3 className="settings__title">
            {i18n.t('settings_email')}
          </h3>
          <div className="form-field form-field--default">
            <input
              className="form-field__input"
              onBlur={onEditCancel}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              onKeyDown={this.handleInputKeyDown.bind(this)}
              ref="email"
              value={email}
            />
            <div className="form-field__bg" />
          </div>
        </div>
      </div>
    );
  }
}

SettingsEmailEdit.propTypes = {
  email: PropTypes.any.isRequired,
  onEditCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsEmailEdit;
