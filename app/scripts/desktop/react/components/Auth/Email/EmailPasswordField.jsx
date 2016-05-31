/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import PasswordField from '../../../../../shared/react/components/common/fields/PasswordField';

class EmailPasswordField extends Component {
  render() {
    const { isDisabled, isError, onChange, value } = this.props;
    const fieldClasses = classNames('form-field', 'form-field--simple', {
      'form-field--error': isError,
    });

    return (
      <div className="form-popup__item">
        <div className={fieldClasses}>
          <PasswordField
            className="form-field__input"
            defaultValue={value}
            disabled={isDisabled}
            onChange={onChange}
            placeholder={i18n.t('password_field')}
            required
          />
          <div className="form-field__bg" />
        </div>
      </div>
    );
  }
}

EmailPasswordField.propTypes = {
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};


export default EmailPasswordField;
