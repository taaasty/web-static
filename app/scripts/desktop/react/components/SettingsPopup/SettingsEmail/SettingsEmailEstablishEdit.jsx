import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class SettingsEmailEstablishEdit extends Component {
  state = { email: '' };
  componentDidMount() {
    this.refs.email.focus();
  }
  isValid() {
    return this.state.email.length >= 5;
  }
  handleButtonClick(ev) {
    ev.preventDefault();
  }
  handleButtonMouseDown() {
    const { onEditCancel, onSubmit } = this.props;

    if (this.isValid()) {
      onSubmit(this.state.email);
    } else {
      onEditCancel();
    }
  }
  handleInputChange(ev) {
    this.setState({ email: ev.target.value });
  }
  handleInputKeyDown(ev) {
    const { onEditCancel, onSubmit } = this.props;

    if (ev.key === 'Enter') {
      ev.preventDefault();
      onSubmit(this.state.email);
    } else if (ev.key === 'Escape') {
      ev.preventDefault();
      onEditCancel();
    }
  }
  render() {
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
            ref="establishButton"
          >
            <span className="button__text">
              {isValid
               ? i18n.t('settings_email_establish_approve')
               : i18n.t('settings_email_establish_disapprove')
              }
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
              onBlur={this.props.onEditCancel}
              onChange={this.handleInputChange.bind(this)}
              onKeyDown={this.handleInputKeyDown.bind(this)}
              ref="email"
              value={this.state.email}
            />
            <div className="form-field__bg" />
          </div>
        </div>
      </div>
    );
  }
}

SettingsEmailEstablishEdit.propTypes = {
  onEditCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsEmailEstablishEdit;
