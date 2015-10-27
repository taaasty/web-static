/*global i18n */
import React, { findDOMNode, Component, PropTypes } from 'react';
import classNames from 'classnames';

class SettingsPhoneEdit extends Component {
  state = {
    isUpdatable: false,
  }
  componentDidMount() {
    this.phoneInput = findDOMNode(this.refs.phone);
  }
  isUpdatable() {
    return (this.phoneInput.value.length &&
            this.phoneInput.value !== this.props.phone);
  }
  onChange() {
    this.setState({ isUpdatable: this.isUpdatable() });
  }
  onClick(ev) {
    const { onEditCancel, onUpdate } = this.props;

    ev.preventDefault();
    if (this.state.isUpdatable) {
      onUpdate(this.phoneInput.value);
    } else {
      onEditCancel();
    }
  }
  onKeyDown(ev) {
    const { onEditCancel, onUpdate } = this.props;

    if (ev.key === 'Enter') {
      ev.preventDefault();
      onUpdate(ev.target.value);
    } else if (ev.key === 'Escape') {
      ev.preventDefault();
      onEditCancel();
    }
  }
  render() {
    const { onEditCancel, phone } = this.props;
    const { isUpdatable } = this.state;

    const buttonClasses = classNames({
      'button': true,
      'button--outline': !isUpdatable,
      'button--yellow': isUpdatable,
    });

    return (
      <div className="settings__item settings__item--full">
        <div className="settings__right">
          <button className={buttonClasses} onClick={this.onClick.bind(this)}>
            <span className="button__text">
              {i18n.t('settings_phone_button', { context: (isUpdatable ? 'update' : 'cancel') })}
            </span>
          </button>
        </div>
        <div className="settings__left">
          <h3 className="settings__title">
            {i18n.t('settings_phone')}
          </h3>
          <div className="form-field form-field--default">
            <input
              className="form-field__input"
              defaultValue={phone}
              onChange={this.onChange.bind(this)}
              onKeyDown={this.onKeyDown.bind(this)}
              placeholder={i18n.t('settings_phone_placeholder')}
              ref="phone"  
              type="tel"
            />
            <div className="form-field__bg" />
          </div>
        </div>
      </div>
    );
  }
}

SettingsPhoneEdit.propTypes = {
  onEditCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  phone: PropTypes.string,
};

export default SettingsPhoneEdit;
