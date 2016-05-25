import React, { Component, PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/Avatar';
import { TLOG_TYPE_ANONYMOUS } from '../../constants/EditorConstants';

class UserAvatar extends Component {
  state = {
    user: this.props.user,
  };
  componentDidMount() {
    this.updateUserpic = this._updateUserpic.bind(this);
    TastyEvents.on(TastyEvents.keys.user_property_changed('avatar', this.props.user.id), this.updateUserpic);
  }
  componentWillUpdate({ user }) {
    if (user !== this.props.user) {
      this.setState({ user });
    }
  }
  componentWillUnmount() {
    TastyEvents.off(TastyEvents.keys.user_property_changed('avatar', this.props.user.id), this.updateUserpic);
  }
  _updateUserpic(userpic) {
    this.setState({ ...this.state.user, userpic });
  }
  render() {
    const { name, slug, tag, userpic } = this.state.user;
    const tUserpic = slug === TLOG_TYPE_ANONYMOUS
          ? {
              kind: 'anonymous',
              symbol: '\ue002',
              default_colors: {
                background: 'transparent',
                name: '#fff',
              },
            }
          : userpic;

    return (
      <Avatar
        name={tag || name}
        size={this.props.size}
        userpic={tUserpic}
      />
    );
  }
}

UserAvatar.propTypes = {
  size: PropTypes.number,
  user: PropTypes.object.isRequired,
};
  
export default UserAvatar;
