import React, { PropTypes } from 'react';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';
import RelationButton from '../RelationButton';

import HeroProfileDropdownMenu from './HeroProfileDropdownMenu';
import WriteMessageButton from './WriteMessageButton';

function HeroProfileActions(props) {
  const { myRelState, tlog } = props;
  const tlogId = tlog.get('id');
  const relId = tlog.get('myRelationshipObject');
  const isAnonymousTlog = tlog.get('slug') === TLOG_SLUG_ANONYMOUS;

  return (
    <div className="hero__actions hero__actions--visible">
      <RelationButton relId={relId} />
      {!isAnonymousTlog &&
       [ <WriteMessageButton
           key="write-message-button"
           userId={tlogId}
         />,
         <HeroProfileDropdownMenu
           key="ellipsis-button"
           relId={relId}
           status={myRelState}
           userId={tlogId}
         /> ]
      }
    </div>
  );
}

HeroProfileActions.propTypes = {
  myRelState: PropTypes.string,
  tlog: PropTypes.object.isRequired,
};

export default HeroProfileActions;
