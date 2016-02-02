import Tab from './Tab';

let TabbedArea = React.createClass({
  getInitialState() {
    return {
      activeKey: 0
    };
  },

  render() {
    let validChildren = [];

    React.Children.forEach(this.props.children, (child) => {
      if (React.isValidElement(child)) validChildren.push(child);
    });

    function renderTabIfSet(child, index) {
      return child.props.tab != null ? this.renderTab(child, index) : null;
    };

    let nav = (
      <nav className="tabs-nav tabs-nav--white">
        <ul className="tabs-nav__list">
          {validChildren.map(renderTabIfSet.bind(this))}
        </ul>
      </nav>
    );

    return (
      <div>
        {nav}
        <div className="tabs-content" ref="panes">
          {validChildren.map(this.renderPane)}
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
           onClick={this.handleTabClick.bind(null, index)}
           key={index}>
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