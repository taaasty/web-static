/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FlowFormHero from '../FlowForm/FlowFormHero';
import FlowFormAddress from '../FlowForm/FlowFormAddress';
import FlowFormRadio from '../FlowForm/FlowFormRadio';
import NoticeService from '../../services/Notice';

class Settings extends Component {
  state = {
    name: this.props.flow.name,
    slug: this.props.flow.slug,
    title: this.props.flow.title,
    flowpic: this.props.flow.flowpic,
    isPremoderate: this.props.flow.isPremoderate,
    isPrivacy: this.props.flow.isPrivacy,
    picFile: null,
  };
  updateValue(name, value) {
    this.setState({ [name]: value });
  }
  saveFlow() {
    const { flow: { id }, updateFlow } = this.props;

    updateFlow(id, this.state)
      .then(() => NoticeService.notifySuccess(i18n.t('manage_flow.update_success')))
      .then((flow) => this.setState({ ...flow, picFile: null }));
  }
  hasUnsavedFields() {
    const {
      name: pName,
      slug: pSlug,
      title: pTitle,
      isPrivacy: pisPrivacy,
      isPremoderate: pisPremoderate,
    } = this.props.flow;
    const {
      picFile,
      name: sName,
      slug: sSlug,
      title: sTitle,
      isPrivacy: sisPrivacy,
      isPremoderate: sisPremoderate,
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
    const { flowpic, isPremoderate, isPrivacy, name, slug, title } = this.state;
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
              checked={isPrivacy}
              description={i18n.t('manage_flow.private_description')}
              id="flow-privacy"
              onChange={this.updateValue.bind(this, 'isPrivacy')}
              title={i18n.t('manage_flow.private_title')}
            />
          </div>
          {false && <div className="flow-form__item">
            <FlowFormRadio
              checked={isPremoderate}
              description={i18n.t('manage_flow.premoderate_description')}
              id="flow-has-premoderation"
              onChange={this.updateValue.bind(this, 'isPremoderate')}
              title={i18n.t('manage_flow.premoderate_title')}
            />
          </div>}
        </div>
        <div className="flow-form__footer">
          {this.hasUnsavedFields() && this.renderSaveButton()}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  flow: PropTypes.object.isRequired,
  updateFlow: PropTypes.func.isRequired,
};

export default Settings;
