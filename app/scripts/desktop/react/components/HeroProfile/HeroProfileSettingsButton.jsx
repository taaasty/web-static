import React, { PropTypes } from 'react';

class HeroProfileSettingsButton {
  handleClick() {
    this.props.onClick();
  }
  render() {
    return (
      <button className="profile-settings-button" onClick={this.handleClick.bind(this)}>
        <i className="icon icon--cogwheel" />
      </button>
    );
  }
}

HeroProfileSettingsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HeroProfileSettingsButton;
