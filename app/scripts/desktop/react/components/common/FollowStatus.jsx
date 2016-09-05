/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import Spinner from '../../../../shared/react/components/common/Spinner';

const CLASS_PREFIX_STATE = 'state--';

const STATE_NONE = 'none';
const STATE_FRIEND = 'friend';
const STATE_IGNORED = 'ignored';
const STATE_GUESSED = 'guessed';
const STATE_REQUESTED = 'requested';
const STATE_ERROR = 'error';
const STATE_PROCESS = 'process';

class FollowStatus extends Component {
  componentDidMount() {
    $(this.refs.container).tooltip({
      placement: 'bottom',
      trigger: 'click hover',
    });
  }
  componentWillUnmount() {
    $(this.refs.container).tooltip('destroy');
  }
  tooltipText(status) {
    switch (status) {
    case STATE_NONE:
      return i18n.t('follow_status_none');
    case STATE_FRIEND:
      return i18n.t('follow_status_friend');
    case STATE_IGNORED:
      return i18n.t('follow_status_ignored');
    case STATE_GUESSED:
      return i18n.t('follow_status_guessed');
    case STATE_REQUESTED:
      return i18n.t('follow_status_requested');
    default:
      console.warn('Неизвестный статус', status);
      break;
    }
  }
  render() {
    const { error, onClick, process, status } = this.props;
    const stateClass = process
      ? STATE_PROCESS
      : error
        ? STATE_ERROR
        : status;

    return (
      <span
        className={`follow-status ${CLASS_PREFIX_STATE}${stateClass}`}
        data-original-title={this.tooltipText(status)}
        onClick={onClick}
      >
        {process
         ? <Spinner size={14} />
         : <i className="icon" />
        }
      </span>
    );
  }
}

FollowStatus.propTypes = {
  error: PropTypes.bool,
  onClick: PropTypes.func,
  process: PropTypes.bool,
  status: PropTypes.string,
};

export default FollowStatus;
