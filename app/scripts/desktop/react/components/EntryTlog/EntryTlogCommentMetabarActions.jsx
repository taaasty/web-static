/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import EntryTlogCommentMetabarAction from './EntryTlogCommentMetabarAction';
import EntryTlogCommentMetabarActionLink from './EntryTlogCommentMetabarActionLink';

const MARGIN_BETWEEN_TOGGLER_AND_MENU = 20;

class EntryTlogCommentMetabarActions extends Component {
  state = {
    open: false,
    marginTop: MARGIN_BETWEEN_TOGGLER_AND_MENU,
  };
  componentDidMount() {
    if (this.state.open) this.calculateTopPosition();
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.open !== nextState.open) {
      this.calculateTopPosition();
    }
  }
  calculateTopPosition() {
    const wHeight = $(window).height();
    const wScrollTop = $(window).scrollTop();
    const $menu = $(this.refs.menu);
    const menuHeight = $menu.innerHeight();
    const menuOffset = $menu.offset();

    let menuScrollTopWindow = menuOffset.top - wScrollTop;
    let marginTop = MARGIN_BETWEEN_TOGGLER_AND_MENU / 2;

    if (this.state.marginTop != marginTop) {
      menuScrollTopWindow -= this.state.marginTop;
    }

    if (menuScrollTopWindow + menuHeight > wHeight) {
      marginTop = (menuHeight + MARGIN_BETWEEN_TOGGLER_AND_MENU) / -1;
    }

    this.setState({ marginTop });
  }
  render() {
    const { marginTop, open } = this.state;
    const { comment, entryId, onCommentReport,
            onCommentEdit, onCommentDelete, url } = this.props;
    const menuClasses = classNames({
      'meta-item__dropdown': true,
      'state--open': open,
      'position-top': marginTop != MARGIN_BETWEEN_TOGGLER_AND_MENU / 2,
    });
    const menuStyles = { marginTop };

    return (
      <span
        className="comment__actions"
        onMouseEnter={() => this.setState({ open: true })}
        onMouseLeave={() => this.setState({ open: false })}
      >
        <i className="icon icon--dots" />
        <span
          className={menuClasses}
          ref="menu"
          style={menuStyles}
        >
          <EntryTlogCommentMetabarActionLink
            entryId={entryId}
            icon="icon--hyperlink"
            title={i18n.t('link_comment_item')}
            url={url}
          />
          {comment.get('canReport', false) &&
           <EntryTlogCommentMetabarAction
             icon="icon--exclamation-mark"
             onClick={onCommentReport}
             title={i18n.t('report_comment_item')}
           />
          }
          {comment.get('canEdit', false) &&
           <EntryTlogCommentMetabarAction
             icon="icon--pencil"
             onClick={onCommentEdit}
             title={i18n.t('edit_comment_item')}
           />
          }
          {comment.get('canDelete', false) &&
           <EntryTlogCommentMetabarAction
             icon="icon--basket"
             onClick={onCommentDelete}
             title={i18n.t('delete_comment_item')}
           />
          }
        </span>
      </span>
    );
  }
}

EntryTlogCommentMetabarActions. propTypes = {
  comment: PropTypes.object.isRequired,
  entryId: PropTypes.number.isRequired,
  onCommentDelete: PropTypes.func,
  onCommentEdit: PropTypes.func,
  onCommentReport: PropTypes.func,
  url: PropTypes.string.isRequired,
};

export default EntryTlogCommentMetabarActions;
