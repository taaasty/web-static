import FlowSettings from './FlowSettings';

let FlowSettingsContainer = React.createClass({
  propTypes: {
    flow: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      name: this.props.flow.name,
      title: this.props.flow.title,
      address: this.props.flow.slug,
      picFile: null,
      staff: []
    };
  },

  render() {
    return (
      <FlowSettings
          flow={this.props.flow}
          staff={this.state.staff}
          staffLimit={3}
          onNameChange={this.updateValue.bind(null, 'name')}
          onTitleChange={this.updateValue.bind(null, 'title')}
          onPicFileChange={this.updateValue.bind(null, 'picFile')}
          onAddressChange={this.updateValue.bind(null, 'address')}
          onStaffChoose={this.handleStaffChoose} />
    );
  },

  updateValue(name, value) {
    this.setState({[name]: value});
  },

  handleStaffChoose(user) {
    let newStaff = this.state.staff.concat(user);
    this.setState({staff: newStaff});
  }
});

export default FlowSettingsContainer;