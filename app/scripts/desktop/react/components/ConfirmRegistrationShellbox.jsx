import React, { PropTypes } from 'react';
import ShellBox from './ShellBox';
import Auth, { SOCIAL_CONFIRM_TAB, EMAIL_CONFIRM_TAB } from './Auth';

function ConfirmRegistrationShellbox({ email, password, postUrl, proposedSlug, type }) {
  return (
    <ShellBox>
      <Auth
        initLogin={email}
        initPassword={password}
        initSlug={proposedSlug}
        initTab={type === 'socialNetwork' ? SOCIAL_CONFIRM_TAB : EMAIL_CONFIRM_TAB}
        postUrl={postUrl}
      />
    </ShellBox>
  );
}

ConfirmRegistrationShellbox.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  postUrl: PropTypes.string.isRequired,
  proposedSlug: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'socialNetwork']).isRequired,
};

export default ConfirmRegistrationShellbox;
