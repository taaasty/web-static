/*global i18n, ReactApp, Settings, DesignSettingsContainer, 
  DesignPaymentContainer, DesignSettingsColorPickerPopup, messagingService */
import CurrentUserStore from  '../stores/current_user';
import PremiumPopup from '../components/PremiumPopup';
import GetPremiumPopup from '../components/PremiumPopup/GetPremiumPopup';
import SelectPremiumPlanPopup from '../components/PremiumPopup/SelectPremiumPlanPopup';
import uri from 'urijs';

const PopupActions = {
  showSettings() {
    ReactApp.popupController.openWithBackground({
      Component: Settings,
      popupProps: {
        title: i18n.t('settings_header'),
        className: 'popup--settings popup--dark',
        clue: 'settings',
      },
    });
  },

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

  showDesignSettings() {
    ReactApp.popupController.open({
      Component: DesignSettingsContainer,
      popupProps: {
        title: i18n.t('design_settings_header'),
        className: 'popup--design-settings',
        clue: 'designSettings',
        draggable: true,
      },
      containerAttribute: 'design-settings-container',
    });
  },

  showDesignSettingsPayment() {
    ReactApp.popupController.openWithBackground({
      Component: DesignPaymentContainer,
      popupProps: {
        title: i18n.t('design_payment_header'),
        className: 'popup--payment',
      },
    });
  },

  showColorPicker(props) {
    ReactApp.popupController.openPopup(DesignSettingsColorPickerPopup, props, 'color-picker-container');
  },

  closeColorPicker() {
    ReactApp.popupController.close('color-picker-container');
  },

  closeDesignSettings() {
    const container = document.querySelector('[design-settings-container]');

    if (container != null) {
      ReactApp.popupController.close('design-settings-container');
    }
  },

  toggleDesignSettings(ev) {
    const user = CurrentUserStore.getUser();

    if (uri().path() === `/~${user.slug}/design_settings`) {
      const container = document.querySelector('[design-settings-container]');

      ev.preventDefault();
      if (container != null) {
        ReactApp.popupController.close('design-settings-container');
      } else {
        this.showDesignSettings();
      }
    }
  },
  
  toggleMessages() {
    messagingService.toggleMessagesPopup();
  },
};

export default PopupActions;
