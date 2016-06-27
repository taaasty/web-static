/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import TextField from '../../../../../shared/react/components/common/fields/TextField';


class EmailLoginField extends Component {
  render() {
    const { isDisabled, isError, onChange, value } = this.props;
    const fieldClasses = classNames('form-field', 'form-field--simple', {
      'form-field--error': isError,
    });

    return (
      <div className="form-popup__item">
        <div className={fieldClasses}>
          <TextField
            autoFocus
            className="form-field__input"
            defaultValue={value}
            disabled={isDisabled}
            onChange={onChange}
            placeholder={i18n.t('login_field_placeholder')}
            required
          />
          <div className="form-field__bg" />
        </div>
      </div>
    );
  }
}

EmailLoginField.propTypes = {
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};


export default EmailLoginField;
