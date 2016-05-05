import React, { PropTypes } from 'react';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';
import RelationButton from '../common/RelationButtonSPA';

import HeroProfileDropdownMenu from './HeroProfileDropdownMenu';
import WriteMessageButton from './WriteMessageButton';

function HeroProfileActions(props) {
  const { relState, tlog } = props;
  const isAnonymousTlog = tlog.slug === TLOG_SLUG_ANONYMOUS;

  return (
    <div className="hero__actions hero__actions--visible">
      <RelationButton
        error={false}
        isFetching={!relState}
        relState={relState}
        subjectId={tlog.id}
        subjectPrivacy={tlog.isPrivacy}
      />
      {!isAnonymousTlog &&
       [ <WriteMessageButton
           key="write-message-button"
           user={tlog}
         />,
         <HeroProfileDropdownMenu
           key="ellipsis-button"
           status={relState}
           userId={tlog.id}
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
