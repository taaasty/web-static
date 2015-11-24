/*global i18n, RequesterMixin, NoticeService */
import React, { createClass, PropTypes } from 'react';
import ApiRoutes from '../../../../shared/routes/api';

const HeroProfileDropdownMenuReportItem = createClass({
  propTypes: {
    onRequestEnd: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
  },
  mixins: [ RequesterMixin ],

  report() {
    this.createRequest({
      url: ApiRoutes.tlog_report(this.props.userId),
      method: 'POST',
      success() {
        NoticeService.notifySuccess(i18n.t('report_user_success'));
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
        onClick={this.report}
      >
        <i className="icon icon--exclamation-mark" />
        {i18n.t('report_tlog_item')}
      </a>
    );
  },
});

export default HeroProfileDropdownMenuReportItem;
