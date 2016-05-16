/*global ThumborService */
import React, { PropTypes } from 'react';
import Image from '../../../../shared/react/components/common/Image';
import { brickWidth, flowAvatarSize } from './constants';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickFlowHeader({ flow }) {
  const originalUrl = glow.getIn([ 'userpic', 'originalUrl' ], '');
  const bgUrl = ThumborService.newImageUrl(originalUrl, { width: brickWidth }, ['blur(5)']);
  const bgStyle = { backgroundImage: `url('${bgUrl}')` };
  const avatarData = {
    geometry: {
      width: flowAvatarSize,
      height: flowAvatarSize,
    },
    url: originalUrl,
  };

  return(
    <div className="brick__flow-header-container" style={bgStyle}>
      <Link to={uri(flow.get('url', '')).path()}>
        <div className="brick__flow-header">
          <span className="brick__flow-header-avatar-container">
            <div className="brick__flow-header-avatar">
              <Image image={avatarData} />
            </div>
          </span>
          <span className="brick__flow-header-data">
            <div className="brick__flow-header-name">
              {`#${flow.get('name')}`}
            </div>
            <div className="brick__flow-header-info">
              <div className="brick__data-item">
                <i className="icon icon--friends" />
                <span>{flow.get('followersCount', 0)}</span>
              </div>
              {false &&
                <div className="brick__data-item">
                  <i className="icon icon--text-circle" />
                  <span>{flow.get('publicTlogEntriesCount', 0)}</span>
                </div>
              }
            </div>
          </span>
        </div>
      </Link>
    </div>  
  );
}

EntryBrickFlowHeader.propTypes = {
  flow: PropTypes.object.isRequired,
};

export default EntryBrickFlowHeader;
