import React, {PropTypes, Component} from 'react';
import FlowActionCreators from '../../actions/Flow';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormAddress from '../FlowForm/FlowFormAddress';

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
}