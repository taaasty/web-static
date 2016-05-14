import React, { PropTypes } from 'react';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';
import RelationButton from '../common/RelationButtonSPA';

import HeroProfileDropdownMenu from './HeroProfileDropdownMenu';
import WriteMessageButton from './WriteMessageButton';

function HeroProfileActions(props) {
  const { relState, tlog } = props;
  const tlogId = tlog.get('id');
  const isAnonymousTlog = tlog.get('slug') === TLOG_SLUG_ANONYMOUS;

  return (
    <div className="hero__actions hero__actions--visible">
      <RelationButton
        error={false}
        isFetching={!relState}
        relState={relState}
        subjectId={tlogId}
        subjectPrivacy={tlog.get('isPrivacy')}
      />
      {!isAnonymousTlog &&
       [ <WriteMessageButton
           key="write-message-button"
           userId={tlogId}
         />,
         <HeroProfileDropdownMenu
           key="ellipsis-button"
           status={relState}
           userId={tlogId}
         /> ]
      }
    </div>
  );
}

HeroProfileActions.propTypes = {
  relState: PropTypes.string,
  tlog: PropTypes.object.isRequired,
};

export default HeroProfileActions;
