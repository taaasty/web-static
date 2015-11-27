/*global i18n, RequesterMixin, NoticeService, TastyEvents */
import React, { createClass, PropTypes } from 'react';
import ApiRoutes from '../../../../shared/routes/api';

const HeroProfileDropdownMenuIgnoreItem = createClass({
  propTypes: {
    onRequestEnd: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
  },
  mixins: [ RequesterMixin ],

  ignore() {
    this.createRequest({
      url: ApiRoutes.change_my_relationship_url(this.props.userId, 'ignore'),
      method: 'POST',
      success: (relationship) => {
        TastyEvents.emit(TastyEvents.keys.follow_status_changed(this.props.userId), relationship.state);
        this.props.onRequestEnd();
      },
      error(data) {
        NoticeService.errorResponse(data);
      },
    }, { progressBar: true });
  },

  render() {
    return (
      <a
        className="action-dropdown-item"
        onClick={this.ignore}
      >
        <i className="icon icon--not-allowed" />
        {i18n.t('ignore_tlog_item')}
      </a>
    );
  },
});

export default HeroProfileDropdownMenuIgnoreItem;
