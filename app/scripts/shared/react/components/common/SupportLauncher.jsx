import React, { PropTypes } from 'react';
import classNames from 'classnames';

function SupportLauncher({ hasUnread, onClick }) {
  const badgeClasses = classNames({
    'support-launcher__badge': true,
    '--visible': hasUnread,
  });

  return (
    <div className="support-container">
      <div className="support-launcher">
        <div className="support-launcher__button" onClick={onClick} />
        <div className={badgeClasses} />
      </div>
    </div>
  );
}

SupportLauncher.propTypes = {
  hasUnread: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SupportLauncher;
