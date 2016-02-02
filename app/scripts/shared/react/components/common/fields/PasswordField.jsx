import Field from './Field';

let PasswordField = React.createClass({
  render() {
    return <Field {...this.props} type="password" />;
  }
});

export default PasswordField;