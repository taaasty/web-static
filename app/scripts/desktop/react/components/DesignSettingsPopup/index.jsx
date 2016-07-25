/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showGetPremiumPopup } from '../../actions/AppStateActions';
import {
  changeDesignOption,
  changeBgImage,
  resetDesignChanges,
  saveDesignChanges,
} from '../../actions/DesignActions';
import DesignSettings from './DesignSettings';
import NoticeService from '../../services/Notice';
import { List, Map } from 'immutable';

const emptyList = List();
const emptyMap = Map();
const emptyDesign = Map();
const emptyChanges = Map();

class DesignSettingsPopup extends Component {
  componentWillUnmount() {
    this.props.resetDesignChanges();
  }
  changeBgImage(file) {
    this.props.changeBgImage(file);
  }
  save() {
    const {
      design,
      hasChanges,
      hasPaidValues,
      showGetPremiumPopup,
      saveDesignChanges,
    } = this.props;

    if (!hasChanges) {
      NoticeService.notifyError(i18n.t('design_settings_no_unsaved_fields_error'));
      return;
    }

    if (hasPaidValues) {
      showGetPremiumPopup();
    } else {
      saveDesignChanges(design.toJS())
        .then(() => NoticeService.notifySuccess(i18n.t('design_settings_save_success')))
        .catch(() => NoticeService.notifyError(i18n.t('design_settings_save_error')));
    }
  }
  render() {
    return (
      <DesignSettings {...this.props}
        onBgImageChange={this.changeBgImage.bind(this)}
        onSave={this.save.bind(this)}
      />
    );
  }
}

DesignSettingsPopup.propTypes = {
  availableOptions: PropTypes.object.isRequired,
  changeBgImage: PropTypes.func.isRequired,
  changeDesignOption: PropTypes.func.isRequired,
  design: PropTypes.object.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  hasPaidValues: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resetDesignChanges: PropTypes.func.isRequired,
  saveDesignChanges: PropTypes.func.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    const currentUserId = state.currentUser.data.id;
    const isPremium = state.currentUser.data.isPremium;

    const availableOptions = state.design.get('availableOptions', Map());
    const isFetching = state.design.get('isFetching', false);
    const changes = state.design.get('changes', emptyChanges);

    const currentDesign = state
          .entities
          .getIn([ 'tlog', String(currentUserId), 'design' ], emptyDesign);
    const design = currentDesign.merge(changes);
    const hasChanges = !currentDesign.equals(design);
    const hasPaidValues = !isPremium && design.some((val, key) => {
      return availableOptions.has(key) &&
        availableOptions.get(key) !== ':ANY:' &&
        availableOptions
        .get(key, emptyList)
        .find((v) => v.get('value') === val, null, emptyMap)
        .get('free') !== true;
    });

    return {
      availableOptions,
      design,
      hasChanges,
      hasPaidValues,
      isFetching,
      tlogId: currentUserId,
    };
  },
  {
    showGetPremiumPopup,
    changeDesignOption,
    changeBgImage,
    resetDesignChanges,
    saveDesignChanges,
  },
  (stateProps, dispatchProps, ownProps) => Object.assign({}, stateProps, dispatchProps, {
    changeBgImage: dispatchProps.changeBgImage.bind(null, stateProps.tlogId),
    saveDesignChanges: dispatchProps.saveDesignChanges.bind(null, stateProps.tlogId),
  }, ownProps)
)(DesignSettingsPopup);
