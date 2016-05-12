import React, {PropTypes, Component} from 'react';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormStaffs from '../FlowForm/FlowFormStaffs';
import FlowActionCreators from '../../actions/Flow';

export default class FlowCreator extends Component {
  static propTypes = {
    staffsLimit: PropTypes.number,
  };
  static defaultProps = {
    staffsLimit: 5,
  };
  state = {
    name: '',
    title: '',
    picFile: null,
    staffs: [],
  };
  updateValue(name, value) {
    this.setState({[name]: value});
  }
  createFlow() {
    FlowActionCreators.create(this.state);
  }
  handleUserChoose(user) {
    // Check whether user already in staffs
    for (let i = 0; i < this.state.staffs.length; i++) {
      let staff = this.state.staffs[i];
      if (staff.user.id === user.id) return;
    }

    let staff = {user, role: 'moderator'};
    let newStaff = this.state.staffs.concat(staff);
    this.setState({staffs: newStaff});
  }
  handleStaffDelete(staff) {
    let newStaff = this.state.staffs.filter((user) => staff.id !== user.id);
    this.setState({staffs: newStaff});
  }
  render() {
    let flowpic = {
      original_url: '//taaasty.com/images/hero-cover.jpg',
    };

    return (
      <div className="flow-form">
        <div className="flow-form__header">
          <FlowFormHero
            flowpic={flowpic}
            name={this.state.name}
            onFlowCreate={this.createFlow.bind(this)}
            onNameChange={this.updateValue.bind(this, 'name')}
            onPicFileChange={this.updateValue.bind(this, 'picFile')}
            onTitleChange={this.updateValue.bind(this, 'title')}
            title={this.state.title}
          />
        </div>
        <div className="flow-form__body">
          <div className="flow-form__item">
            <div className="flow-form__left">
              <FlowFormChooser
                limitReached={this.props.staffsLimit === this.state.staffs.length}
                onChoose={this.handleUserChoose.bind(this)}
              />
            </div>
            <FlowFormStaffs
              canChangeRole={false}
              onDelete={this.handleStaffDelete.bind(this)}
              staffs={this.state.staffs}
            />
          </div>
        </div>
      </div>
    );
  }
}
