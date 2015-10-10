import React from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import LazyLoadImage from '../../../../../shared/react/components/common/LazyLoadImage';
import { brickWidth, flowAvatarSize } from './constants';

class EntryBrickFlowHeader {
  render() {
    const { flow } = this.props;
    const bgUrl = ThumborService.newImageUrl(
      flow.userpic.original_url,
      { width: brickWidth },
      ['blur(5)']
    );
    const bgStyle = { backgroundImage: `url('${bgUrl}')` };
    const avatarData = {
      geometry: {
        width: flowAvatarSize,
        height: flowAvatarSize,
      },
      url: flow.userpic.original_url,
    }

    return(
      <div className="brick__flow-header-container" style={bgStyle}>
        <a href={flow.url}>
          <div className="brick__flow-header">
            <span className="brick__flow-header-avatar-container">
              <div className="brick__flow-header-avatar">
                <LazyLoadImage image={avatarData} />
              </div>
            </span>
            <span className="brick__flow-header-data">
              <div className="brick__flow-header-name">
                {`#${flow.name}`}
              </div>
              <div className="brick__flow-header-info">
                <div className="brick__data-item">
                  <i className="icon icon--friends" />
                  <span>{flow.followers_count || 0}</span>
                </div>
                <div className="brick__data-item">
                  <i className="icon icon--text-circle" />
                  <span>{flow.public_tlog_entries_count || 0}</span>
                </div>
              </div>
            </span>
          </div>
        </a>
      </div>  
    );
  }
}

EntryBrickFlowHeader.propTypes = {
  flow: ProjectTypes.tlogData.isRequired,
};

export default EntryBrickFlowHeader;
