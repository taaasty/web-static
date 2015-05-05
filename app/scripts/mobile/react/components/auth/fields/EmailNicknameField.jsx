import classnames from 'classnames';
import TextField from '../../../../../shared/react/components/common/fields/TextField';

let EmailNicknameField = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="auth__field">
        <label htmlFor="auth-nick" className="auth__field-icon">
          <i className="icon icon--diary" />
        </label>
        <TextField
            value={this.props.value}
            placeholder={i18n.t('placeholders.auth_nickname')}
            id="auth-nick"
            className="auth__field-input"
            required={true}
            onChange={this.props.onChange} />
      </div>
    );
  }
});

export default EmailNicknameField;