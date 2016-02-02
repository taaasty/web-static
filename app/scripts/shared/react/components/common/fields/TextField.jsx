import Field from './Field';

let TextField = React.createClass({
  render() {
    return <Field {...this.props} type="text" />;
  }
});

export default TextField;