import React, { PropTypes, Component, cloneElement } from 'react';
import classnames from 'classnames';
// import DropdownMenu from './DropdownMenu';

export default class DropdownButton extends Component {
  static propTypes = {
    activeItem: PropTypes.string,
    iconClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }
  state = {
    activeItem: this.props.activeItem || '',
    open: false
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.activeItem !== nextProps.activeItem) {
      this.setState({activeItem: nextProps.activeItem});
    }
  }
  render() {
    return (
      <div className="person__dropdown-container"
           onMouseEnter={this.handleMouseEnter.bind(this)}
           onMouseLeave={this.handleMouseLeave.bind(this)}>
        <button className={classnames('button', this.props.buttonClassName)}>
          <i className={classnames('icon', this.props.iconClassName)} />
        </button>
        {this.renderMenu()}
      </div>
    );
  }
  renderMenu() {
    let menuClasses = classnames('person__dropdown', {
      'state--open': this.state.open
    });

    return (
      <div className={menuClasses}>
        {React.Children.map(this.props.children, this.renderMenuItem.bind(this))}
      </div>
    );
  }
  renderMenuItem(child, idx) {
    return cloneElement(child, {
      active: this.props.activeItem === child.props.item,
      onClick: this.handleItemClick.bind(this)
    });
  }
  handleMouseEnter() {
    this.setState({open: true});
  }
  handleMouseLeave() {
    this.setState({open: false});
  }
  handleItemClick(item) {
    if (this.state.activeItem !== item) {
      this.setState({activeItem: item});
      this.props.onChange(item);
    }
  }
  //   handleOptionSelect(key) {
//     if (this.props.onSelect) {
//       this.props.onSelect(key);
//     }

//     this.setDropdownState(false);
//   }

}
  
//   propTypes: {
//     pullRight: React.PropTypes.bool,
//     dropup:    React.PropTypes.bool,
//     title:     React.PropTypes.node,
//     href:      React.PropTypes.string,
//     onClick:   React.PropTypes.func,
//     onSelect:  React.PropTypes.func,
//     navItem:   React.PropTypes.bool,
//     noCaret:   React.PropTypes.bool,
//     buttonClassName: React.PropTypes.string
//   },

//   render() {
//     let renderMethod = this.props.navItem ?
//       'renderNavItem' : 'renderButtonGroup';

//     let caret = this.props.noCaret ?
//         null : (<span className="caret" />);

//     return this[renderMethod]([
//       <button
//         className={classnames(this.props.buttonClassName)}
//         onTouchTap={createChainedFunction(this.props.onClick, this.handleDropdownClick)}
//         key={0}
//         navDropdown={this.props.navItem}
//         navItem={null}
//         title={null}
//         pullRight={null}
//         dropup={null}>
//         {this.props.title}{' '}
//         {caret}
//       </Button>,
//       <DropdownMenu
//         ref="menu"
//         aria-labelledby={this.props.id}
//         pullRight={this.props.pullRight}
//         key={1}>
//         {ValidComponentChildren.map(this.props.children, this.renderMenuItem)}
//       </DropdownMenu>
//     ]);
//   },

//   renderButtonGroup(children) {
//     let groupClasses = {
//         'open': this.state.open,
//         'dropup': this.props.dropup
//       };

//     return (
//       <ButtonGroup
//         bsSize={this.props.bsSize}
//         className={classNames(this.props.className, groupClasses)}>
//         {children}
//       </ButtonGroup>
//     );
//   },

//   renderNavItem(children) {
//     let classes = {
//         'dropdown': true,
//         'open': this.state.open,
//         'dropup': this.props.dropup
//       };

//     return (
//       <li className={classNames(this.props.className, classes)}>
//         {children}
//       </li>
//     );
//   },

//   renderMenuItem(child, index) {
//     // Only handle the option selection if an onSelect prop has been set on the
//     // component or it's child, this allows a user not to pass an onSelect
//     // handler and have the browser preform the default action.
//     let handleOptionSelect = this.props.onSelect || child.props.onSelect ?
//       this.handleOptionSelect : null;

//     return cloneElement(
//       child,
//       {
//         // Capture onSelect events
//         onSelect: createChainedFunction(child.props.onSelect, handleOptionSelect),
//         key: child.key ? child.key : index
//       }
//     );
//   },

//   handleDropdownClick(e) {
//     e.preventDefault();

//     this.setDropdownState(!this.state.open);
//   },

//   handleOptionSelect(key) {
//     if (this.props.onSelect) {
//       this.props.onSelect(key);
//     }

//     this.setDropdownState(false);
//   }
// });

// export default DropdownButton;


//         <DropdownArea activeItem={staff.role}>
//           <button className="button button--small button--outline button--icon">
//             <i className="icon icon--cogwheel" />
//           </button>
//           <DropdownItem item={STAFF_MODERATOR_ROLE} />
//           <DropdownItem item={STAFF_ADMIN_ROLE} />
//         </DropdownArea>
//         <div className="person__dropdown-container">
          
//           <div className="person__dropdown">
//             <a className="person__dropdown-item state--active" href="#">Модератор</a>
//             <a className="person__dropdown-item" href="#">Редактор</a>
//           </div>
//         </div>