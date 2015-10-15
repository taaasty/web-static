import DesignActionCreators from '../../actions/design';
import PopupActionCreators from '../../actions/popup';
import CurrentUserStore from '../../stores/current_user';
import DesignStore from '../../stores/design';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import DesignSettings from './DesignSettings';

let DesignSettingsContainer = React.createClass({
  propTypes: {
    design: React.PropTypes.object.isRequired,
    hasDesignBundle: React.PropTypes.bool.isRequired,
    hasPaidValues: React.PropTypes.bool.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    options: React.PropTypes.object.isRequired,
  },

  componentWillUnmount() {
    DesignActionCreators.closeDesignSettings()
  },

  render() {
    return (
      <DesignSettings {...this.props}
        onBgImageChange={this.changeBgImage}
        onOptionChange={this.changeOption}
        onSave={this.save}
      />
    );
  },

  changeOption(name, value) {
    DesignActionCreators.changeOption(name, value);
  },

  changeBgImage(file) {
    DesignActionCreators.changeBgImage(file);
  },

  save() {
    if (this.props.hasPaidValues && !this.props.hasDesignBundle) {
      PopupActionCreators.showDesignSettingsPayment();
    } else {
      DesignActionCreators.saveCurrent();
    }
  },
});

DesignSettingsContainer = connectToStores(DesignSettingsContainer, [DesignStore, CurrentUserStore], (props) => ({
  design: DesignStore.getCurrent(),
  options: DesignStore.getOptions(),
  hasDesignBundle: CurrentUserStore.hasDesignBundle(),
  hasUnsavedFields: DesignStore.hasUnsavedFields(),
  hasPaidValues: DesignStore.hasPaidValues(),
  isSaving: DesignStore.isSaving(),
}));

export default DesignSettingsContainer;
