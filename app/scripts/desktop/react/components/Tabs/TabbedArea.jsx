import React, { Children, Component, PropTypes, cloneElement, isValidElement } from 'react';
import Tab from './Tab';

class TabbedArea extends Component {
  state = { activeKey: 0 };
  renderTab(child, index) {
    const { tab, count, disabled } = child.props;

    return (
      <Tab
        active={this.state.activeKey === index}
        count={count}
        disabled={disabled}
        key={index}
        onClick={this.handleTabClick.bind(this, index)}
        ref={`tab${index}`}
      >
        {tab}
      </Tab>
    );
  }
  renderPane(child, index) {
    return cloneElement(child, {
      active: (this.state.activeKey === index),
      key: child.key ? child.key : index,
    });
  }
  handleTabClick(index) {
    this.setState({ activeKey: index });
  }
  render() {
    function renderTabIfSet(child, index) {
      return child.props.tab != null ? this.renderTab(child, index) : null;
    };

    const { children } = this.props;
    const validChildren = Children.toArray(children).filter(isValidElement);

    return (
      <div className="tabs-wrapper">
        <nav className="tabs-nav tabs-nav--white">
          <ul className="tabs-nav__list">
            {validChildren.map(renderTabIfSet.bind(this))}
          </ul>
        </nav>
        <div className="tabs-content" ref="panes">
          {validChildren.map(this.renderPane.bind(this))}
        </div>
      </div>
    );
  }
}

TabbedArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default TabbedArea;
