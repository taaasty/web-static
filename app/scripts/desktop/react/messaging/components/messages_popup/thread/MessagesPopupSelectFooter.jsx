import React, { Component, PropTypes } from 'react';

class MessagesPopupSelectFooter extends Component {
  render() {
    const { stopSelect } = this.props;

    return (
        <div className="message-form">
        <div className="message-form__button-container">
        <button className="message-form__button --red">
        Удалить
        </button>
        <button className="message-form__button --red">
        Удалить для всех
      </button>
        <button
      className="message-form__button --white"
      onTouchTap={stopSelect}
        >
        Отмена
        </button>
        </div>
        </div>
    );
  }
}

MessagesPopupSelectFooter.propTypes = {
  stopSelect: PropTypes.func.isRequired,
};

export default MessagesPopupSelectFooter;
