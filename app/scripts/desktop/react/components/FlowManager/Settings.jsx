/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormAddress from '../FlowForm/FlowFormAddress';
import FlowFormRadio from '../FlowForm/FlowFormRadio';

class Settings extends Component {
  state = {
    name: this.props.flow.name,
    slug: this.props.flow.slug,
    title: this.props.flow.title,
    flowpic: this.props.flow.flowpic,
    is_premoderate: this.props.flow.is_premoderate,
    is_privacy: this.props.flow.is_privacy,
    picFile: null,
  };
  updateValue(name, value) {
    this.setState({[name]: value});
  }
  saveFlow() {
    const { FlowActions } = this.props;

    FlowActions.update(this.state)
      .then((flow) => this.setState({ ...flow, picFile: null }));
  }
  hasUnsavedFields() {
    const {
      name: pName,
      slug: pSlug,
      title: pTitle,
      is_privacy: pisPrivacy,
      is_premoderate: pisPremoderate,
    } = this.props.flow;
    const {
      picFile,
      name: sName,
      slug: sSlug,
      title: sTitle,
      is_privacy: sisPrivacy,
      is_premoderate: sisPremoderate,
    } = this.state;

    return (
      pName !== sName || pSlug !== sSlug || pTitle !== sTitle ||
      pisPrivacy !== sisPrivacy || pisPremoderate !== sisPremoderate ||
      picFile != null
    );
  }
  renderSaveButton() {
    return (
      <button
        className="flow-form__save-button"
        onClick={this.saveFlow.bind(this)}
      >
        {i18n.t('manage_flow.save')}
      </button>
    );
  }
  render() {
    const { flowpic, is_premoderate, is_privacy, name, slug, title } = this.state;
    const formClasses = classNames({
      'flow-form': true,
      '__has-unsaved-fields': this.hasUnsavedFields(),
    });

    return (
      <div className={formClasses}>
        <div className="flow-form__header">
          <FlowFormHero
            flowpic={flowpic}
            name={name}
            onNameChange={this.updateValue.bind(this, 'name')}
            onPicFileChange={this.updateValue.bind(this, 'picFile')}
            onTitleChange={this.updateValue.bind(this, 'title')}
            title={title}
          />
        </div>
        <div className="flow-form__body">
          <div className="flow-form__item">
            <FlowFormAddress
              onChange={this.updateValue.bind(this, 'slug')}
              value={slug}
            />
          </div>
          <div className="flow-form__item">
            <FlowFormRadio
              checked={is_privacy}
              description={i18n.t('manage_flow.private_description')}
              id="flow-privacy"
              onChange={this.updateValue.bind(this, 'is_privacy')}
              title={i18n.t('manage_flow.private_title')}
            />
          </div>
          <div className="flow-form__item">
            <FlowFormRadio
              checked={is_premoderate}
              description={i18n.t('manage_flow.premoderate_description')}
              id="flow-has-premoderation"
              onChange={this.updateValue.bind(this, 'is_premoderate')}
              title={i18n.t('manage_flow.premoderate_title')}
            />
          </div>
        </div>
        <div className="flow-form__footer">
          {this.hasUnsavedFields() && this.renderSaveButton()}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  FlowActions: PropTypes.object.isRequired,
  flow: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    is_privacy: PropTypes.bool.isRequired,
    is_premoderate: PropTypes.bool.isRequired,
    flowpic: PropTypes.object.isRequired,
  }).isRequired,
};

export default Settings;
