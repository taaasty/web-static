/*global i18n */
import React, { Component, PropTypes } from 'react';
import Button from './Button';
import Dropdown from './Dropdown';
import classnames from 'classnames';

const OPEN_STATE  = 'openState';
const CLOSE_STATE = 'closeState';

class Chooser extends Component {
  state = { currentState: OPEN_STATE };
  activateOpenState() {
    this.setState({ currentState: OPEN_STATE });
  }
  activateCloseState() {
    this.setState({ currentState: CLOSE_STATE });
  }
  isOpenState() {
    return this.state.currentState === OPEN_STATE;
  }
  isCloseState() {
    return this.state.currentState === CLOSE_STATE;
  }
  render() {
    const chooserClasses = classnames({
      'messages__chooser': true,
      'state--open': this.isOpenState(),
    });

    return (
      <div className="messages__box">
        <div className={chooserClasses}>
          {this.state.currentState === CLOSE_STATE
           ? <Button onClick={this.activateOpenState.bind(this)} />
           : <Dropdown onCancel={this.activateCloseState.bind(this)} onSubmit={this.props.onSubmit} />
          }
        </div>
        <div className="messages__field">
          <input
            data-placeholder="Введите имя"
            style={{ 'width': '100%' }}
            type="hidden"
          />
        </div>
        <div className="messages__hint">
          {i18n.t('new_thread_hint')}
        </div>
      </div>
    );
  }
}

Chooser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Chooser;
