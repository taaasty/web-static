import {PropTypes} from 'react';
import Switcher from '../common/Switcher';

export default class FlowFormRadio {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div>
        <div className="flow-form__right">
          <Switcher {...this.props} />
        </div>
        <div className="flow-form__left">
          <h3 className="flow-form__title">{this.props.title}</h3>
          {this.renderDescription()}
        </div>
      </div>
    );
  }
  renderDescription() {
    let {description} = this.props;
    return description ? <p className="flow-form__desc">{description}</p> : null;
  }
}
