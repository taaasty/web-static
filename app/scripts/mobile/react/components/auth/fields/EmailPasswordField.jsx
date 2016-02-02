import classnames from 'classnames';
import PasswordField from '../../../../../shared/react/components/common/fields/PasswordField';

let EmailPasswordField = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="auth__field">
        <label htmlFor="auth-password" className="auth__field-icon">
          <i className="icon icon--lock" />
        </label>
        <PasswordField
            defaultValue={this.props.value}
            placeholder={i18n.t('placeholders.auth_password')}
            id="auth-password"
            className="auth__field-input"
            required={true}
            onChange={this.props.onChange} />
      </div>
    );
  }
});

export default EmailPasswordField;