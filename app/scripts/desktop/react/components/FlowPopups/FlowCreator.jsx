import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormStaff from '../FlowForm/FlowFormStaff';
import FlowActionCreators from '../../actions/Flow';

let FlowCreator = React.createClass({
  propTypes: {
    staffLimit: React.PropTypes.number
  },

  getDefaultProps() {
    return {
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
    let emptyFlow = {
      name: '',
      title: '',
      flowpic: {
        original_url: 'http://taaasty.com/images/hero-cover.jpg'
      }
    };

    return (
      <div className="flow-form">
        <div className="flow-form__header">
          <FlowFormHero
              flow={emptyFlow}
              onNameChange={this.updateValue.bind(null, 'name')}
              onTitleChange={this.updateValue.bind(null, 'title')}
              onPicFileChange={this.updateValue.bind(null, 'picFile')} />
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

  updateValue(name, value) {
    this.setState({[name]: value});
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

export default FlowCreator;