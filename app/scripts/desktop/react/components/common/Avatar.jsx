import classnames from 'classnames';
import Image from './Image';

let Avatar = React.createClass({
  propTypes: {
    userpic: React.PropTypes.object.isRequired,
    size: React.PropTypes.number.isRequired
  },

  getDefaultProps() {
    return {
      size: 220
    };
  },

  render() {
    let { original_url: url, symbol, kind } = this.props.userpic;

    let avatarClasses = classnames('avatar', {
      'anonymous_char': kind === 'anonymous'
    });

    if (url != null) {
      let avatarUrl = ThumborService.newImageUrl(url, {
        width: this.props.size, height: this.props.size
      });

      let avatarStyles = {
        backgroundImage: `url("${avatarUrl}")`
      };

      return (
        <span className={avatarClasses}>
          <Image image={{url: avatarUrl}} className="avatar__img" />
        </span>
      );
    } else {
      let avatarStyles = {
        backgroundColor: this.props.userpic.default_colors.background,
        color: this.props.userpic.default_colors.name
      };

      return (
        <span className={avatarClasses} style={avatarStyles}>
          <span className="avatar__text">
            {symbol}
          </span>
        </span>
      );
    }
  }
});

export default Avatar;