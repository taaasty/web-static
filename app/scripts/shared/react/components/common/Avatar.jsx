import React, { PropTypes } from 'react';
import classnames from 'classnames';
import LazyLoadImage from './LazyLoadImage';

class Avatar {
  getAvatarClasses() {
    return classnames({
      'avatar': true,
      'anonymous_char': this.props.userpic.kind === 'anonymous',
    });
  }
  renderImage() {
    const { userpic: { original_url: url }, size } = this.props;
    const image = {
      url,
      geometry: {
        width: size,
        height: size,
      },
    };

    return (
      <span className={this.getAvatarClasses()}>
        <LazyLoadImage className="avatar__img" image={image} />
      </span>
    );
  }
  renderSymbol() {
    const { default_colors: { background, name }, symbol } = this.props.userpic;
    const avatarStyles = {
      backgroundColor: background,
      color: name,
    };

    return (
      <span className={this.getAvatarClasses()} style={avatarStyles}>
        <span className="avatar__text">
          {symbol}
        </span>
      </span>
    );
  }
  render() {
    return (this.props.userpic.original_url != null) ? this.renderImage() : this.renderSymbol();
  }
}

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  userpic: PropTypes.object.isRequired,
};

Avatar.defaultProps = {
  size: 220,
};

export default Avatar;
