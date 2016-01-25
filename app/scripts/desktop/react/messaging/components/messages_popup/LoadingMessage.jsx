import React, { PropTypes } from 'react';
import Spinner from '../../../../../shared/react/components/common/Spinner';

function LoadingMessage({ content }) {
  return (
    <div className="grid-full">
      <div className="grid-full__middle">
        <div className="messages-loading">
          <div className="messages-loading__header">
            <Spinner size={30} />
          </div>
          <div className="messages-loading__body">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

LoadingMessage.propTypes = {
  content: PropTypes.string.isRequired,
};

export default LoadingMessage;
