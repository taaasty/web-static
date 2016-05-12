/*global ThumborService */
import React from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import Image from '../../../../shared/react/components/common/Image';
import { brickWidth, flowAvatarSize } from './constants';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickFlowHeader({ flow }) {
  const bgUrl = ThumborService.newImageUrl(
    flow.userpic.originalUrl,
    { width: brickWidth },
    ['blur(5)']
  );
  const bgStyle = { backgroundImage: `url('${bgUrl}')` };
  const avatarData = {
    geometry: {
      width: flowAvatarSize,
      height: flowAvatarSize,
    },
    url: flow.userpic.originalUrl,
  };

  return(
    <div className="brick__flow-header-container" style={bgStyle}>
      <Link to={uri(flow.url).path()}>
        <div className="brick__flow-header">
          <span className="brick__flow-header-avatar-container">
            <div className="brick__flow-header-avatar">
              <Image image={avatarData} />
            </div>
          </span>
          <span className="brick__flow-header-data">
            <div className="brick__flow-header-name">
              {`#${flow.name}`}
            </div>
            <div className="brick__flow-header-info">
              <div className="brick__data-item">
                <i className="icon icon--friends" />
                <span>{flow.followersCount || 0}</span>
              </div>
              {false &&
                <div className="brick__data-item">
                  <i className="icon icon--text-circle" />
                  <span>{flow.publicTlogEntriesCount || 0}</span>
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
  flow: ProjectTypes.tlogData.isRequired,
};

export default EntryBrickFlowHeader;
