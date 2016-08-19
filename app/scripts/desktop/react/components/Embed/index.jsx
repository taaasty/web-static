import React, { PropTypes } from 'react';
import EmbedNoCover from './NoCover';
import EmbedWithCover from './WithCover';

function Embed(props) {
  const {
    autoplay,
    coverImageUrl,
   } = props;

  return (coverImageUrl && !autoplay) ?
      <EmbedWithCover {...props} /> :
      <EmbedNoCover {...props} />;
}

Embed.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  coverImageUrl: PropTypes.string,
  embedHtml: PropTypes.string.isRequired,
  frameHeight: PropTypes.number.isRequired,
  frameWidth: PropTypes.number.isRequired,
};

export default Embed;
