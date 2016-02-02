import Field from './Field';

let EmailField = React.createClass({
  render() {
    return <Field {...this.props} type="email" />;
  }
});

export default EmailField;