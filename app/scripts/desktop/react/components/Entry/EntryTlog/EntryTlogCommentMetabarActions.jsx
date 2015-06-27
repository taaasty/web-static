import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const MARGIN_BETWEEN_TOGGLER_AND_MENU = 20;

export default class EntryTlogCommentMetabarActions extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired
  }
  state = {
    open: false,
    marginTop: MARGIN_BETWEEN_TOGGLER_AND_MENU
  }
  componentDidMount() {
    if (this.state.open) this.calculateTopPosition();
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.open !== nextState.open) {
      this.calculateTopPosition();
    }
  }
  render() {
    const menuClasses = classNames('meta-item__dropdown', {
      'state--open': this.state.open,
      'position-top': this.state.marginTop != MARGIN_BETWEEN_TOGGLER_AND_MENU / 2
    });
    const menuStyles = {
      marginTop: this.state.marginTop
    };

    return (
      <span className="comment__actions"
            onMouseEnter={() => this.setState({ open: true })}
            onMouseLeave={() => this.setState({ open: false })}>
        <i className="icon icon--dots" />
        <span ref="menu" className={menuClasses} style={menuStyles}>
          <EntryTlogCommentMetabarAction
              url={this.props.url}
              title={i18n.t('link_comment_item')}
              icon="icon--hyperlink" />
          {
            this.props.comment.can_report && (
              <EntryTlogCommentMetabarAction
                  icon="icon--exclamation-mark"
                  title={i18n.t('report_comment_item')}
                  onClick={this.props.onCommentReport} />
            )
          }
          {
            this.props.comment.can_edit && (
              <EntryTlogCommentMetabarAction
                  icon="icon--pencil"
                  title={i18n.t('edit_comment_item')}
                  onClick={this.props.onCommentEdit} />
            )
          }
          {
            this.props.comment.can_delete && (
              <EntryTlogCommentMetabarAction
                  icon="icon--basket"
                  title={i18n.t('delete_comment_item')}
                  onClick={this.props.onCommentDelete} />
            )
          }
        </span>
      </span>
    );
  }
  calculateTopPosition() {
    const wHeight = $(window).height(),
          wScrollTop = $(window).scrollTop(),
          $menu = $(React.findDOMNode(this.refs.menu)),
          menuHeight = $menu.innerHeight(),
          menuOffset = $menu.offset();

    let menuScrollTopWindow = menuOffset.top - wScrollTop,
        marginTop = MARGIN_BETWEEN_TOGGLER_AND_MENU / 2;

    if (this.state.marginTop != marginTop) {
      menuScrollTopWindow -= this.state.marginTop;
    }

    if (menuScrollTopWindow + menuHeight > wHeight) {
      marginTop = (menuHeight + MARGIN_BETWEEN_TOGGLER_AND_MENU) / -1;
    }

    this.setState({ marginTop });
  }
}

class EntryTlogCommentMetabarAction extends Component {
  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string.isRequired,
    hoverTitle: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string, PropTypes.array
    ]).isRequired,
    onClick: PropTypes.func
  }
  state = {
    hover: false
  }
  render() {
    const iconClasses = classNames('icon', this.props.icon);

    return (
      <a href={this.props.url}
         className="comment__dropdown-item"
         onClick={this.props.onClick}
         onMouseEnter={() => this.setState({hover: true})}
         onMouseLeave={() => this.setState({hover: false})}>
        <i className={iconClasses} />
        {this.getTitle()}
      </a>
    );
  }
  getTitle() {
    const { title, hoverTitle } = this.props;
    return this.state.hover && hoverTitle ? hoverTitle : title;
  }
}