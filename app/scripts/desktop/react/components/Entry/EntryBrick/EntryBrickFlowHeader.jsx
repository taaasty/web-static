import React from 'react';
import Tooltip from '../../common/Tooltip';
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
        <div className="brick__flow-header">
          <span className="brick__flow-header-avatar-container">
            <a href={flow.url}>
              <div className="brick__flow-header-avatar">
                <LazyLoadImage image={avatarData} />
              </div>
            </a>
          </span>
          <span className="brick__flow-header-data">
            <div className="brick__flow-header-name">
              <a href={flow.url}>
                {`#${flow.name}`}
              </a>
            </div>
            <div className="brick__flow-header-info">
              <div className="brick__data-item">
                <Tooltip title={i18n.t('flow_brick.followers_count_tooltip')}>
                  <i className="icon icon--friends" />
                  <span>{flow.followers_count || 0}</span>
                </Tooltip>
              </div>
              <div className="brick__data-item">
                <Tooltip title={i18n.t('flow_brick.entries_count_tooltip')}>
                  <i className="icon icon--text-circle" />
                  <span>{flow.public_tlog_entries_count || 0}</span>
                </Tooltip>
              </div>
            </div>
          </span>
        </div>
      </div>  
    );
  }
}

EntryBrickFlowHeader.propTypes = {
  flow: ProjectTypes.tlogData.isRequired,
};

export default EntryBrickFlowHeader;
