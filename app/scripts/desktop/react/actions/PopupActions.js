/*global ReactApp, DesignSettingsColorPickerPopup, messagingService */
import PremiumPopup from '../components/PremiumPopup';
import GetPremiumPopup from '../components/PremiumPopup/GetPremiumPopup';
import SelectPremiumPlanPopup from '../components/PremiumPopup/SelectPremiumPlanPopup';

const PopupActions = {
  showPremiumPopup() {
    ReactApp.popupController.openWithBackground({
      Component: PremiumPopup,
      popupProps: {
        title: '',
        className: 'popup--premium popup--dark',
        clue: 'premiumPopup',
      },
    });
  },

  showGetPremiumPopup() {
    ReactApp.popupController.openWithBackground({
      Component: GetPremiumPopup,
      props: {
        onClick: this.showSelectPremiumPlanPopup,
      },
      popupProps: {
        title: '',
        className: 'popup--premium popup--dark',
        clue: 'getPremiumPopup',
      },
    });
  },

  showSelectPremiumPlanPopup() {
    ReactApp.popupController.openWithBackground({
      Component: SelectPremiumPlanPopup,
      popupProps: {
        title: '',
        className: 'popup--premium popup--dark',
        clue: 'selectPremiumPlanPopup',
      },
    });
  },

  showColorPicker(props) {
    ReactApp.popupController.openPopup(DesignSettingsColorPickerPopup, props, 'color-picker-container');
  },

  closeColorPicker() {
    ReactApp.popupController.close('color-picker-container');
  },

  toggleMessages() {
    messagingService.toggleMessagesPopup();
  },
};

export default PopupActions;
