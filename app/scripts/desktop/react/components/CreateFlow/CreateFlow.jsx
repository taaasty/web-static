import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormStaff from '../FlowForm/FlowFormStaff';
import FlowActionCreators from '../../actions/Flow';

let CreateFlow = React.createClass({
  propTypes: {
    flow: React.PropTypes.object,
    staffLimit: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      flow: {
        name: '',
        title: '',
        flowpic: {url: 'http://taaasty.com/images/hero-cover.jpg'}
      },
      staffLimit: 3
    };
  },

  getInitialState() {
    return {
      name: '',
      title: '',
      picFile: null,
      staff: []
    };
  },

  render() {
    return (
      <div className="flow-form">
        <div className="flow-form__header">
          <FlowFormHero
              flow={this.props.flow}
              onNameChange={this.handleNameChange}
              onTitleChange={this.handleTitleChange}
              onPicFileChange={this.handlePicFileChange} />
        </div>
        <div className="flow-form__body">
          <div className="flow-form__item">
            <div className="flow-form__right">
              <button className="button button--yellow button--small"
                      onTouchTap={this.handleButtonClick}>
                Создать поток
              </button>
            </div>
            <div className="flow-form__left">
              <FlowFormChooser
                  limitReached={this.props.staffLimit == this.state.staff.length}
                  onChoose={this.handleStaffChoose} />
            </div>
            <FlowFormStaff
                staff={this.state.staff}
                onDelete={this.handleStaffDelete} />
          </div>
        </div>
      </div>
    );
  },

  handleNameChange(name) {
    this.setState({name});
  },

  handleTitleChange(title) {
    this.setState({title});
  },

  handlePicFileChange(picFile) {
    this.setState({picFile});
  },

  handleStaffChoose(user) {
    let newStaff = this.state.staff.concat(user);
    this.setState({staff: newStaff});
  },

  handleStaffDelete(staff) {
    let newStaff = this.state.staff.filter((user) => staff.id !== user.id);
    this.setState({staff: newStaff});
  },

  handleButtonClick() {
    FlowActionCreators.create(this.state)
  }
});

export default CreateFlow;