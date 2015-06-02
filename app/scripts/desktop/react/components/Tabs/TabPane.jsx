import classnames from 'classnames';

let TabPane = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

  render() {
    let classes = classnames('tabs-panel', {
      'state--active': this.props.active
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});

export default TabPane;