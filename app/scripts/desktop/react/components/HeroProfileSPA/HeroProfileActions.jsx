import React, { PropTypes } from 'react';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';
import RelationButton from '../common/RelationButtonSPA';

import HeroProfileDropdownMenu from './HeroProfileDropdownMenu';
import WriteMessageButton from './WriteMessageButton';

function HeroProfileActions(props) {
  const { RelationshipActions, relState, tlog } = props;
  const { errorRelationship, isFetchingRelationship, data: { author } } = tlog;
  const isAnonymousTlog = author.slug === TLOG_SLUG_ANONYMOUS;

  return (
    <div className="hero__actions hero__actions--visible">
      <RelationButton
        RelationshipActions={RelationshipActions}
        error={errorRelationship}
        isFetching={isFetchingRelationship}
        relState={relState}
        subjectId={author.id}
        subjectPrivacy={author.is_privacy}
      />
      {!isAnonymousTlog &&
       [ <WriteMessageButton
           key="write-message-button"
           user={author}
         />,
         <HeroProfileDropdownMenu
           key="ellipsis-button"
           status={relState}
           userId={author.id}
         /> ]
      }
    </div>
  );
}

HeroProfileActions.propTypes = {
  RelationshipActions: PropTypes.object.isRequired,
  relState: PropTypes.string,
  tlog: PropTypes.object.isRequired,
};

export default HeroProfileActions;
