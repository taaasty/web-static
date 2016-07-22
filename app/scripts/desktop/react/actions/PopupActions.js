/*global ReactApp, DesignSettingsColorPickerPopup, messagingService */

const PopupActions = {
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
