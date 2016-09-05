/*global ReactApp, DesignSettingsColorPickerPopup */

const PopupActions = {
  showColorPicker(props) {
    ReactApp.popupController.openPopup(DesignSettingsColorPickerPopup, props,
      'color-picker-container');
  },

  closeColorPicker() {
    ReactApp.popupController.close('color-picker-container');
  },
};

export default PopupActions;
