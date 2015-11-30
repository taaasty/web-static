import React, { PropTypes } from 'react';
import classnames from 'classnames';

class HeroProfileStatsItem {
  handleClick(ev) {
    if (this.props.onClick) {
      ev.preventDefault();
      this.props.onClick($(ev.currentTarget));
    }
  }
  renderLink() {
    const { count, href, title } = this.props;

    return (
      <a
        className="hero__stats-link"
        href={href}
        title={`${count} ${title}`}
      >
        <strong>
          {count}
        </strong>
        {title}
      </a>
    );
    
  }
  renderButton() {
    const { count, title } = this.props;

    return (
      <span>
        <strong>
          {count}
        </strong>
        {title}
      </span>
    );
  }
  render() {
    const { href, onClick } = this.props;
    const statsItemClasses = classnames({
      'hero__stats-item': true,
      'hero__stats-item-handler': onClick,
    });

    return (
      <div
        className={statsItemClasses}
        onClick={this.handleClick.bind(this)}
      >
        {href ? this.renderLink() : this.renderButton()}
      </div>
    );
  }
}

HeroProfileStatsItem.propTypes = {
  count: PropTypes.number.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default HeroProfileStatsItem;
