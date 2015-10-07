import React from 'react';
import { TLOG_SLUG_ANONYMOUS } from '../../../../../shared/constants/Tlog';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';

import WriteMessageButton from './WriteMessageButton';

class HeroProfileActions {
  render() {
    const { relationship, user } = this.props;
    const isAnonymousTlog = user.slug === TLOG_SLUG_ANONYMOUS;

    return (
      <div className="hero__actions hero__actions--visible">
        <FollowButton relationship={relationship} />
        {!isAnonymousTlog &&
         [ <WriteMessageButton
             key="write-message-button"
             user={user}
           />,
           <HeroProfile_DropdownMenu
             key="ellipsis-button"
             status={relationship.state}
             userId={user.id}
           /> ]
        }
      </div>
    );
  }
}

HeroProfileActions.propTypes = {
  relationship: ProjectTypes.relationship,
  user: ProjectTypes.heroUser,
};

export default HeroProfileActions;
