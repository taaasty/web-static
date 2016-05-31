/*global i18n, gon, TastyUtils */
import React from 'react';

function StatsFooter() {
  const entriesCount = parseInt(TastyUtils.formatNumber(gon.app_stats.entries_count, 100, ''));
  const formatedEntriesCount = TastyUtils.formatNumber(gon.app_stats.entries_count, 100);
  const usersCount = parseInt(TastyUtils.formatNumber(gon.app_stats.users_count, 100, ''));
  const formatedUsersCount = TastyUtils.formatNumber(gon.app_stats.users_count, 100);
  const seconds = 30;

  return (
    <div className="inviter__stats">
      <div className="inviter__stats-item">
        <span>
          <strong>{formatedEntriesCount}+</strong>
          <span>{i18n.t('entries_count', { count: entriesCount })}</span>
        </span>
      </div>
      <div className="inviter__stats-item">
        <span>
          <strong>{formatedUsersCount}+</strong>
          <span>{i18n.t('users_count', { count: usersCount })}</span>
        </span>
      </div>
      <div className="inviter__stats-item">
        <span>
          <strong>
            <span className="tilde">&#126;</span>
            <span>{seconds}</span>
          </strong>
          <span>{i18n.t('seconds_count', { count: seconds })}</span>
        </span> 
      </div>
    </div>
  );
}

export default StatsFooter;
