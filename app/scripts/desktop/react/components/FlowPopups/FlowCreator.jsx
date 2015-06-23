import React, {PropTypes, Component} from 'react';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormStaffs from '../FlowForm/FlowFormStaffs';
import FlowActionCreators from '../../actions/Flow';

export default class FlowCreator extends Component {
  static propTypes = {
    staffsLimit: PropTypes.number
  }
  static defaultProps = {
    staffsLimit: 5
  }
  state = {
    name: '',
    title: '',
    picFile: null,
    staffs: []
  }
  render() {
    let flowpic = {
      original_url: 'http://taaasty.com/images/hero-cover.jpg'
    };

    return (
      <div className="flow-form">
        <div className="flow-form__header">
          <FlowFormHero
              name={this.state.name}
              title={this.state.title}
              flowpic={flowpic}
              onNameChange={this.updateValue.bind(this, 'name')}
              onTitleChange={this.updateValue.bind(this, 'title')}
              onPicFileChange={this.updateValue.bind(this, 'picFile')}
              onFlowCreate={::this.createFlow} />
        </div>
        <div className="flow-form__body">
          <div className="flow-form__item">
            <div className="flow-form__left">
              <FlowFormChooser
                  limitReached={this.props.staffsLimit === this.state.staffs.length}
                  onChoose={this.handleUserChoose.bind(this)} />
            </div>
            <FlowFormStaffs
                staffs={this.state.staffs}
                canChangeRole={false}
                onDelete={this.handleStaffDelete.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
  updateValue(name, value) {
    this.setState({[name]: value});
  }
  handleUserChoose(user) {
    let staff = {user, role: 'moderator'};
    let newStaff = this.state.staffs.concat(staff);
    this.setState({staffs: newStaff});
  }
  handleStaffDelete(staff) {
    let newStaff = this.state.staffs.filter((user) => staff.id !== user.id);
    this.setState({staffs: newStaff});
  }
  createFlow() {
    FlowActionCreators.create(this.state)
  }
}