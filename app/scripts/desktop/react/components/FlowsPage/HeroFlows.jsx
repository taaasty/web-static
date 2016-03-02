/*global i18n */
import React from 'react';
import Hero from '../HeroComponent/Hero';

function HeroFlows() {
  return (
    <Hero
      backgroundUrl="http://taaasty.com/images/hero-cover.jpg"
      title={i18n.t('hero.flows')}
    />
  );
}

HeroFlows.displayName = 'HeroFlows';

HeroFlows.propTypes = {
};

export default HeroFlows;
