import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import FlowActionCreators from '../../actions/Flow';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormAddress from '../FlowForm/FlowFormAddress';
import FlowFormRadio from '../FlowForm/FlowFormRadio';

export default class FlowManagerSettings extends Component {
  static propTypes = {
    flow: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      is_privacy: PropTypes.bool.isRequired,
      has_premoderation: PropTypes.bool.isRequired,
      flowpic: PropTypes.object.isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired
  }
  state = {
    name: this.props.flow.name,
    slug: this.props.flow.slug,
    title: this.props.flow.title,
    flowpic: this.props.flow.flowpic,
    is_privacy: this.props.flow.is_privacy,
    has_premoderation: this.props.flow.has_premoderation,
    picFile: null
  }
  render() {
    let formClasses = classnames('flow-form', {
      '__has-unsaved-fields': this.hasUnsavedFields()
    });

    return (
      <div className={formClasses}>
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
            <FlowFormRadio
                id="flow-privacy"
                title="Закрытый поток?"
                description="Содержимое потока видно только подписчикам."
                checked={this.state.is_privacy}
                onChange={this.updateValue.bind(this, 'is_privacy')} />
          </div>
          <div className="flow-form__item">
            <FlowFormRadio
                id="flow-has-premoderation"
                title="Премодерация"
                description="Записи появляются в потоке только после одобрения руководством потока."
                checked={this.state.has_premoderation}
                onChange={this.updateValue.bind(this, 'has_premoderation')} />
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
                onClick={::this.saveFlow}>
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
        let { name, slug, title, flowpic, is_privacy, has_premoderation } = flow;

        this.setState({
          name, slug, title, flowpic, is_privacy, has_premoderation,
          picFile: null
        });

        this.props.onUpdate(flow);
      });
  }
  hasUnsavedFields() {
    let {
      name: pName,
      slug: pSlug,
      title: pTitle,
      is_privacy: pisPrivacy,
      has_premoderation: phasPremoderation
    } = this.props.flow;
    let {
      picFile,
      name: sName,
      slug: sSlug,
      title: sTitle,
      is_privacy: sisPrivacy,
      has_premoderation: shasPremoderation
    } = this.state;

    return (
      pName !== sName || pSlug !== sSlug || pTitle !== sTitle ||
      pisPrivacy !== sisPrivacy || phasPremoderation !== shasPremoderation ||
      picFile != null
    );
  }
}