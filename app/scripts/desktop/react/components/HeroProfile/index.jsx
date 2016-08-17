/*global $, Mousetrap */
import React, { Component, PropTypes } from 'react';
import HeroProfileActionsContainer from './HeroProfileActionsContainer';
import CloseToolbar from './CloseToolbar';
import HeroProfileAvatar from './HeroProfileAvatar';
import HeroProfileHead from './HeroProfileHead';
import HeroProfileStats from './HeroProfileStats';
import SmartFollowStatus from './SmartFollowStatus';
import Spinner from '../../../../shared/react/components/common/Spinner';

const HERO_OPENED_CLASS = 'hero-enabled';

class HeroProfile extends Component {
  componentWillMount() {
    this.props.closeHero();

    this.onResize = this._onResize.bind(this);
    this.scrollFade = this._scrollFade.bind(this);
    this.handleHeroScroll = this.handleHeroScroll.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
  }
  componentDidMount() {
    this.$hero = $(this.refs.container);
    this.heroInitialHeight = this.$hero.height();

    Mousetrap.bind('esc', this.handleEsc);
    $(window).on('resize', this.onResize);
    $(window).on('scroll', this.scrollFade);
    $(window).on('scroll.hero', this.handleHeroScroll);
  }
  componentWillReceiveProps(nextProps) {
    const {
      closeHero,
      isOpen,
      tlog,
    } = this.props;
    const {
      isOpen: nextIsOpen,
      tlog: nextTlog,
    } = nextProps;

    if (tlog.get('id') !== nextTlog.get('id')) {
      closeHero();
    } else {
      if (isOpen && !nextIsOpen) { // closing
        this.restoreInitialHeroHeight();
        window.setTimeout(this.unsetHeroHeight.bind(this), 1500);
        $('body').removeClass(HERO_OPENED_CLASS);
      } else if (!isOpen && nextIsOpen) { // opening
        this.setHeroWindowHeight();
        $('body').addClass(HERO_OPENED_CLASS).scrollTop(0);
      }
    }
  }
  componentWillUnmount() {
    $('body').removeClass(HERO_OPENED_CLASS);
    Mousetrap.unbind('esc', this.handleEsc);
    $(window).off('resize', this.onResize);
    $(window).off('scroll', this.scrollFade);
    $(window).off('scroll.hero', this.handleHeroScroll);

    this.props.closeHero();
  }
  handleEsc() {
    const {
      closeHero,
      isOpen,
    } = this.props;

    if (isOpen) {
      closeHero();
    }
  }
  handleHeroScroll() {
    const {
      closeHero,
      isOpen,
    } = this.props;

    if (isOpen) {
      closeHero();
    }
  }
  handleAvatarClick(ev) {
    const {
      isOpen,
      openHero,
    } = this.props;

    ev.preventDefault();
    if (!isOpen) {
      this.setInitialHeroHeight();
    }

    openHero();
  }
  _onResize() {
    if (this.props.isOpen) {
      this.setHeroWindowHeight();
    }
  }
  unsetHeroHeight() {
    if (!this.props.isOpen) {
      this.$hero.css('height', '');
    }
  }
  setInitialHeroHeight() {
    this.initialHeroHeight = this.$hero.height();
    this.$hero.css('height', this.heroInitialHeight);
  }
  restoreInitialHeroHeight() {
    this.$hero.css('height', this.heroInitialHeight);
  }
  setHeroWindowHeight() {
    this.$hero.css('height', $(window).height());
  }
  _scrollFade() {
    const $heroBox = $(this.refs.heroBox);
    const height = $heroBox.outerHeight() / 1.5;
    let scrollTop = $(window).scrollTop();

    // Не производим пересчёт значений, если hero уже вне поля видимости
    if (scrollTop < this.heroInitialHeight) {
      if (scrollTop < 0) {
        scrollTop = 0;
      }

      $heroBox.css({
        'transform': `translateY(${scrollTop}px)`,
        '-ms-transform': `translateY(${scrollTop}px)`,
        '-webkit-transform': `translateY(${scrollTop}px)`,
        'opacity': Math.max(1 - scrollTop / height, 0),
      });
    }
  }
  render() {
    const {
      closeHero,
      isCurrentUser,
      isOpen,
      showSettingsPopup,
      tlog,
      tlogRelation,
    } = this.props;
    const tlogId = tlog.get('id');

    return (
      <div className="hero hero-profile" ref="container">
        <CloseToolbar onClick={closeHero} />
        <div className="hero__overlay" />
        <div className="hero__gradient" />
        <div className="hero__box" ref="heroBox">
          {!tlogId
            ? <Spinner size={70} />
            : (
              <HeroProfileAvatar
                isOpen={isOpen}
                onClick={this.handleAvatarClick.bind(this)}
                user={tlog}
              />
            )
          }
          {!isCurrentUser && <SmartFollowStatus relId={tlog.get('myRelationshipObject')} />}
          {tlogId && <HeroProfileHead user={tlog} />}
          <HeroProfileActionsContainer
            isCurrentUser={!!isCurrentUser}
            showSettingsPopup={showSettingsPopup}
            tlog={tlog}
            tlogRelation={tlogRelation}
          />
        </div>
        {!!tlog.get('stats') && (
          <HeroProfileStats
            close={closeHero}
            user={tlog}
          />
        )}
      </div>
    );
  }
}

HeroProfile.propTypes = {
  closeHero: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openHero: PropTypes.func.isRequired,
  showSettingsPopup: PropTypes.func.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogRelation: PropTypes.object.isRequired,
};

export default HeroProfile;
