import FlowActionCreators from '../../actions/Flow';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormChooser from '../FlowForm/FlowFormChooser';
import FlowFormAddress from '../FlowForm/FlowFormAddress';
import FlowFormStaff from '../FlowForm/FlowFormStaff';

let FlowSettings = React.createClass({
  propTypes: {
    flow: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string,
      flowpic: React.PropTypes.object.isRequired
    }).isRequired,
    staff: React.PropTypes.array.isRequired,
    staffLimit: React.PropTypes.number.isRequired,
    onNameChange: React.PropTypes.func.isRequired,
    onTitleChange: React.PropTypes.func.isRequired,
    onPicFileChange: React.PropTypes.func.isRequired,
    onAddressChange: React.PropTypes.func.isRequired,
    onStaffChoose: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="flow-form">
        <div className="flow-form__header">
          <FlowFormHero
              flow={this.props.flow}
              onNameChange={this.props.onNameChange}
              onTitleChange={this.props.onTitleChange}
              onPicFileChange={this.props.onPicFileChange} />
        </div>
        <div className="flow-form__body">
          <div className="flow-form__item">
            <FlowFormAddress
                value={this.props.flow.slug}
                onChange={this.props.onAddressChange} />
          </div>
          <div className="flow-form__item">
            <FlowFormChooser
                limitReached={this.props.staffLimit === this.props.staff.length}
                onChoose={this.props.onStaffChoose} />
          </div>
        </div>
      </div>
    );
  }
});

export default FlowSettings;