import React, { Component, PropTypes } from 'react';

class UserAvatar extends Component {
  state = {
    user: this.props.user,
  }
  componentDidMount() {
    this.updateUserpic = this._updateUserpic.bind(this);
    TastyEvents.on(TastyEvents.keys.user_property_changed('avatar', this.props.user.id), this.updateUserpic);
  }
  componentWillUnmount() {
    TastyEvents.off(TastyEvents.keys.user_property_changed('avatar', this.props.user.id), this.updateUserpic);
  }
  _updateUserpic(userpic) {
    this.setState({ ...this.state.user, userpic });
  }
  render() {
    const { name, tag, userpic } = this.state.user;

    return (
      <Avatar
        name={tag || name}
        size={this.props.size}
        userpic={userpic}
      />
    );
  }
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.number,
};
  
export default UserAvatar;
