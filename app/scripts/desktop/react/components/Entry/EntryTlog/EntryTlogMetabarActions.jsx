import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const MARGIN_BETWEEN_TOGGLER_AND_MENU = 20;

export default class EntryTlogMetabarActions extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired
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
      <span className="meta-item meta-item--actions">
        <span className="meta-item__content"
              onMouseEnter={() => this.setState({open: true})}
              onMouseLeave={() => this.setState({open: false})}>
          <i className="meta-item__common icon icon--dots" />
          <span ref="menu" className={menuClasses} style={menuStyles}>
            {
              this.props.entry.can_edit && (
                <EntryTlogMetabarAction
                    url={Routes.editEntry(this.props.entry.tlog.tag, this.props.entry.id)}
                    title={i18n.t('edit_entry_item')}
                    icon="icon--pencil" />
              )
            }
            <EntryTlogMetabarAction
                url={this.props.entry.url}
                title={i18n.t('link_entry_item')}
                icon="icon--hyperlink" />
            {
              this.props.entry.can_favorite && (
                <EntryTlogMetabarFavorite {...this.props}
                    isFavorited={this.props.entry.is_favorited} />
              )
            }
            {
              this.props.entry.can_watch && (
                <EntryTlogMetabarWatch {...this.props}
                    isWatching={this.props.entry.is_watching} />
              )
            }
            {
              this.props.entry.can_report && (
                <EntryTlogMetabarReport {...this.props} />
              )
            }
            {
              this.props.entry.can_delete && (
                <EntryTlogMetabarDelete {...this.props} />
              )
            }
          </span>
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

class EntryTlogMetabarAction extends Component {
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
         className="meta-item__dropdown-item"
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

class EntryTlogMetabarFavorite {
  static propTypes = {
    isFavorited: PropTypes.bool,
    onAddToFavorites: PropTypes.func.isRequired,
    onRemoveFromFavorites: PropTypes.func.isRequired
  }
  render() {
    let icon, title, hoverTitle;

    if (this.props.isFavorited) {
      icon = ['icon--star', 'icon--star-fill'];
      title = i18n.t('entry_in_favorites');
      hoverTitle = i18n.t('remove_from_favorites_entry_item');
    } else {
      icon = ['icon--star'];
      title = i18n.t('add_to_favorites_entry_item');
    }

    return (
      <EntryTlogMetabarAction
          icon={icon}
          title={title}
          hoverTitle={hoverTitle}
          onClick={this.handleClick()} />
    );
  }
  handleClick() {
    return this.props.isFavorited ? this.props.onRemoveFromFavorites : this.props.onAddToFavorites
  }
}

class EntryTlogMetabarWatch {
  static propTypes = {
    isWatching: PropTypes.bool,
    onAddToWatching: PropTypes.func.isRequired,
    onRemoveFromWatching: PropTypes.func.isRequired
  }
  render() {
    let title, hoverTitle;

    if (this.props.isWatching) {
      title = i18n.t('watching_entry_item');
      hoverTitle = i18n.t('stop_watch_entry_item');
    } else {
      title = i18n.t('start_watch_entry_item');
    }

    return (
      <EntryTlogMetabarAction
          icon="icon--comments-subscribe"
          title={title}
          hoverTitle={hoverTitle}
          onClick={this.handleClick()} />
    );
  }
  handleClick() {
    return this.props.isWatching ? this.props.onRemoveFromWatching : this.props.onAddToWatching
  }
}

class EntryTlogMetabarReport {
  static propTypes = {
    onReport: PropTypes.func.isRequired
  }
  render() {
    return (
      <EntryTlogMetabarAction
          icon="icon--exclamation-mark"
          title={i18n.t('report_entry_item')}
          onClick={this.props.onReport} />
    );
  }
}

class EntryTlogMetabarDelete {
  static propTypes = {
    onDelete: PropTypes.func.isRequired
  }
  render() {
    let title, hoverTitle;

    if (this.props.isWatching) {
      title = i18n.t('watching_entry_item');
      hoverTitle = i18n.t('stop_watch_entry_item');
    } else {
      title = i18n.t('start_watch_entry_item');
    }

    return (
      <EntryTlogMetabarAction
          icon="icon--basket"
          title={i18n.t('delete_entry_item')}
          hoverTitle={hoverTitle}
          onClick={this.props.onDelete} />
    );
  }
}