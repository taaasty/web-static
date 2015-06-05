import classnames from 'classnames';

let Tab = React.createClass({
  propTypes: {
    count: React.PropTypes.number,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    let linkClasses = classnames('tabs-nav__link', {
      'state--active': this.props.active
    });

    return (
      <li className="tabs-nav__item" onTouchTap={this.props.onClick}>
        <a className={linkClasses}>
          {this.props.children} {this.renderCount()}
        </a>
      </li>
    );
  },

  renderCount() {
    if (this.props.count) {
      return (
        <span className="tabs-nav__count">
          {this.props.count}
        </span>
      );
    }
  }
});

export default Tab;