import Tab from './Tab';

let TabbedArea = React.createClass({
  propTypes: {

  },

  getInitialState() {
    return {
      activeKey: 0
    };
  },

  render() {
    function renderTabIfSet(child, index) {
      return child.props.tab != null ? this.renderTab(child, index) : null;
    };

    let nav = (
      <nav className="tabs-nav tabs-nav--white">
        <ul className="tabs-nav__list">
          {React.Children.map(this.props.children, renderTabIfSet.bind(this))}
        </ul>
      </nav>
    );

    return (
      <div>
        {nav}
        <div className="tabs-content" ref="panes">
          {React.Children.map(this.props.children, this.renderPane)}
        </div>
      </div>
    );
  },

  renderTab(child, index) {
    let { tab, count, disabled } = child.props;

    return (
      <Tab ref={'tab' + index}
           active={this.state.activeKey === index}
           count={count}
           disabled={disabled}
           onClick={this.handleTabClick.bind(null, index)}>
        {tab}
      </Tab>
    );
  },

  renderPane(child, index) {
    return React.cloneElement(child, {
      active: (this.state.activeKey === index),
      key: child.key ? child.key : index,
    });
  },

  handleTabClick(index) {
    this.setState({activeKey: index});
  }
});

export default TabbedArea;