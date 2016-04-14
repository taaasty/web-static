import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Image from '../../../../shared/react/components/common/Image';

const SUBSCRIBED_STATE = 'friend';

function FlowsListItem({ flow: { flow, relationship }, width }) {
  if (!width) {
    return <noscript />;
  }

  const image = {
    geometry: {
      width,
      height: Math.floor(width /2),
    },
    url: flow.flowpic.original_url,
  };
  const containerClasses = classNames({
    'flow': true,
    '__subscribed': relationship.state === SUBSCRIBED_STATE,
  });

  return (
    <div className={containerClasses}>
      <a href={flow.tlog_url}>
        <div className="flow__image">
          <div className="media-image">
            <Image image={image} />
          </div>
        </div>
        <div className="flow__content">
          <h2 className="flow__title">
            {flow.name}
          </h2>
          <p className="flow__caption">
            {flow.title}
          </p>
          <div className="flow__data">
            <div className="flow__data-item">
              <i className="icon icon--friends" />
              {flow.followers_count}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

FlowsListItem.displayName = 'FlowsListItem';

FlowsListItem.propTypes = {
  flow: PropTypes.shape({
    flow: PropTypes.object.isRequired,
    relationship: PropTypes.object.isRequired,
  }).isRequired,
  width: PropTypes.number,
};

export default FlowsListItem;
