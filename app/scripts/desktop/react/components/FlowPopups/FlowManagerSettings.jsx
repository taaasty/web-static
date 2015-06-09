import React, {PropTypes, Component} from 'react';
import FlowActionCreators from '../../actions/Flow';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormAddress from '../FlowForm/FlowFormAddress';
import FlowFormStaffs from '../FlowForm/FlowFormStaffs';

export default class FlowManagerSettings extends Component {
  static propTypes = {
    flow: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      staffs: PropTypes.array.isRequired,
      flowpic: PropTypes.object.isRequired
    }).isRequired,
    staffsLimit: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
    onStaffsUpdate: PropTypes.func.isRequired
  }
  static defaultProps = {
    staffsLimit: 5
  }
  state = {
    name: this.props.flow.name,
    slug: this.props.flow.slug,
    title: this.props.flow.title,
    staffs: this.props.flow.staffs,
    flowpic: this.props.flow.flowpic,
    picFile: null
  }
  render() {
    return (
      <div className="flow-form">
        <div className="flow-form__header">
          <FlowFormHero
              name={this.state.name}
              title={this.state.title}
              flowpic={this.state.flowpic}
              onNameChange={this.updateValue.bind(this, 'name')}
              onTitleChange={this.updateValue.bind(this, 'title')}
              onPicFileChange={this.updateValue.bind(this, 'picFile')} />
        </div>
        <div className="flow-form__body">
          <div className="flow-form__item">
            <FlowFormAddress
                value={this.state.slug}
                onChange={this.updateValue.bind(this, 'slug')} />
          </div>
          <div className="flow-form__item">
            <FlowFormChooser
                limitReached={this.props.staffsLimit === this.state.staffs.length}
                onChoose={this.handleUserChoose.bind(this)} />
            <FlowFormStaffs
                staffs={this.state.staffs}
                onDelete={this.handleStaffDelete.bind(this)}
                onRoleChange={this.handleStaffRoleChange.bind(this)} />
          </div>
        </div>
        <div className="flow-form__footer">
          {this.renderSaveButton()}
        </div>
      </div>
    );
  }
  renderSaveButton() {
    if (this.hasUnsavedFields()) {
      return (
        <button className="flow-form__save-button"
                onTouchTap={this.saveFlow.bind(this)}>
          Сохранить
        </button>
      );
    }
  }
  updateValue(name, value) {
    this.setState({[name]: value});
  }
  saveFlow() {
    FlowActionCreators.update(this.props.flow.id, this.state)
      .then((flow) => {
        let { name, slug, title, flowpic } = flow;

        this.setState({
          name, slug, title, flowpic,
          picFile: null
        });

        this.props.onUpdate(flow);
      });
  }
  hasUnsavedFields() {
    let { name: pName, slug: pSlug, title: pTitle } = this.props.flow;
    let { name: sName, slug: sSlug, title: sTitle, picFile } = this.state;

    return (
      pName !== sName || pSlug !== sSlug || pTitle !== sTitle || picFile != null
    );
  }
  handleUserChoose(user) {
    FlowActionCreators.addStaff(this.props.flow.id, user.id)
      .then((staff) => {
        let newStaff = this.state.staffs.concat(staff);
        this.setState({staffs: newStaff});
        this.props.onStaffsUpdate(this.state.staffs);
      });
  }
  handleStaffDelete(staff) {
    FlowActionCreators.removeStaff(this.props.flow.id, staff.user.id)
      .then((staff) => {
        let newStaff = this.state.staffs.filter((item) => item.user.id !== staff.user.id);
        this.setState({staffs: newStaff});
        this.props.onStaffsUpdate(this.state.staffs);
      });
  }
  handleStaffRoleChange(staff, role) {
    FlowActionCreators.changeStaffRole(this.props.flow.id, staff.user.id, role)
      .then((staff) => {
        this.state.staffs.forEach((item) => {
          if (item.user.id === staff.user.id) item.role = role
        });
        this.props.onStaffsUpdate(this.state.staffs);
        this.forceUpdate();
      });
  }
}