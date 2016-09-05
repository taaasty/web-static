/*global i18n, FileReader */
import React, { Component, PropTypes } from 'react';
import EditableField from '../common/EditableField';
import FlowFormUpload from './FlowFormUpload';
import ThumborService from '../../../../shared/react/services/thumbor';

class FlowFormHero extends Component {
  state = {
    backgroundImage: ThumborService.newImageUrl(
      this.props.flowpic.originalUrl,
      { width: 520, height: 286 }
    ),
  };
  showPicFilePreview(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.setState({ backgroundImage: e.target.result });
    };

    reader.readAsDataURL(file);
  }
  handleUpload(file) {
    this.showPicFilePreview(file);
    this.props.onPicFileChange(file);
  }
  renderActions() {
    return (
      <div className="flow-form__hero-actions">
        <button
          className="button button--yellow button--small"
          onClick={this.props.onFlowCreate}
        >
          Создать поток
        </button>
      </div>
    );
  }
  render() {
    const { name, onFlowCreate, onNameChange, onTitleChange, title } = this.props;
    const heroStyles = {
      backgroundImage: `url("${this.state.backgroundImage}")`,
    };

    return (
      <div className="flow-form__hero" style={heroStyles}>
        <FlowFormUpload onUpload={this.handleUpload.bind(this)} />
        <div className="flow-form__hero-box">
          <div className="flow-form__hero-title">
            <EditableField
              onChange={onNameChange}
              placeholder={i18n.t('flow_form.name_placeholder')}
              returnFor="blur"
              value={name}
            />
          </div>
          <div className="flow-form__hero-text">
            <EditableField
              onChange={onTitleChange}
              placeholder={i18n.t('flow_form.title_placeholder')}
              returnFor="blur"
              value={title}
            />
          </div>
          {onFlowCreate && this.renderActions()}
        </div>
      </div>
    );
  }
}

FlowFormHero.propTypes = {
  flowpic: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onFlowCreate: PropTypes.func,
  onNameChange: PropTypes.func.isRequired,
  onPicFileChange: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default FlowFormHero;
