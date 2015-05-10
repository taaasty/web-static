import classnames from 'classnames';
import PasswordField from '../../../../../../shared/react/components/common/fields/PasswordField';

let EmailPasswordField = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    isDisabled: React.PropTypes.bool,
    isError: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    let fieldClasses = classnames('form-field', 'form-field--simple', {
      'form-field--error': this.props.isError
    });

    return (
      <div className="form-popup__item">
        <div className={fieldClasses}>
          <PasswordField
              defaultValue={this.props.value}
              placeholder={i18n.t('password_field')}
              required={true}
              disabled={this.props.isDisabled}
              className="form-field__input"
              onChange={this.props.onChange} />
          <div className="form-field__bg" />
        </div>
      </div>
    );
  }
});

export default EmailPasswordField;