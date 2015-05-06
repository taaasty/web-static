import classnames from 'classnames';
import EmailField from '../../../../../shared/react/components/common/fields/EmailField';

let EmailEmailField = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="auth__field">
        <label htmlFor="auth-email" className="auth__field-icon">
          <i className="icon icon--profile" />
        </label>
        <EmailField
            value={this.props.value}
            placeholder={i18n.t('placeholders.auth_email')}
            id="auth-email"
            className="auth__field-input"
            required={true}
            onChange={this.props.onChange} />
      </div>
    );
  }
});

export default EmailEmailField;