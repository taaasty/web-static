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
      isPremium,
      showGetPremiumPopup,
      saveDesignChanges,
    } = this.props;

    if (!hasChanges) {
      NoticeService.notifyError(i18n.t('design_settings_no_unsaved_fields_error'));
      return;
    }

    if (hasPaidValues && !isPremium) {
      showGetPremiumPopup();
    } else {
      saveDesignChanges(design)
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
  isPremium: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resetDesignChanges: PropTypes.func.isRequired,
  saveDesignChanges: PropTypes.func.isRequired,
  showGetPremiumPopup: PropTypes.func.isRequired,
};

export default connect(
  (state, { onClose }) => {
    const currentUserId = state.currentUser.data.id;
    const isPremium = state.currentUser.data.isPremium;

    const availableOptions = state.design.get('availableOptions', Map());
    const freeOptions = state.design.get('freeOptions', Map());
    const isFetching = state.design.get('isFetching', false);
    const changes = state.design.get('changes', Map());

    const hasChanges = !!changes.count();
    const design = state
          .entities
          .getIn([ 'tlog', String(currentUserId), 'design' ], Map())
          .merge(changes);
    const hasPaidValues = !changes.every((val, key) => {
      const freeVals = freeOptions.get(key, List());

      return freeVals === ':ANY:' || freeVals.includes(val);
    });

    return {
      availableOptions,
      design,
      hasChanges,
      hasPaidValues,
      isFetching,
      isPremium,
      onClose,
    };
  },
  {
    showGetPremiumPopup,
    changeDesignOption,
    changeBgImage,
    resetDesignChanges,
    saveDesignChanges,
  }
)(DesignSettingsPopup);
