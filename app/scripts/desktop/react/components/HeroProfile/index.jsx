/*global $, TastyEvents, Mousetrap, CurrentUserStore */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import HeroProfileActionsContainer from './HeroProfileActionsContainer';
import CloseToolbar from '../toolbars/CloseToolbar';
import HeroProfileAvatar from './HeroProfileAvatar';
import HeroProfileHead from './HeroProfileHead';
import HeroProfileStats from './HeroProfileStats';

const HERO_CLOSED = 'closed';
const HERO_OPENED = 'opened';
const HERO_OPENED_CLASS = 'hero-enabled';

const transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd' +
        'msTransitionEnd transitionend';

class HeroProfile extends Component {
  state = {
    currentState: HERO_CLOSED,
  };
  componentWillMount() {
    this.open = this._open.bind(this);
    this.close = this._close.bind(this);
    this.onResize = this._onResize.bind(this);
    this.scrollFate = this._scrollFade.bind(this);
  }
  componentDidMount() {
    this.$hero = $(findDOMNode(this));
    this.heroClosedHeight = this.$hero.height();

    $(window).on('resize', this.onResize);
    $(window).on('scroll', this.scrollFade);

    TastyEvents.on(TastyEvents.keys.command_hero_open(), this.open);
    TastyEvents.on(TastyEvents.keys.command_hero_close(), this.close);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.currentState != nextState.currentState;
  }
  componentWillUnmount() {
    $(window).off('resize', this.onResize);
    $(window).off('scroll', this.scrollFade);

    TastyEvents.off(TastyEvents.keys.command_hero_open(), this.open);
    TastyEvents.off(TastyEvents.keys.command_hero_close(), this.close);
  }
  isCurrentUser() {
    return CurrentUserStore.isLogged() &&
      CurrentUserStore.getUser().id == this.props.user.id;
  }
  _open() {
    Mousetrap.bind('esc', this.close);
    this.setHeroWindowHeight();
    $('body').addClass(HERO_OPENED_CLASS).scrollTop(0);

    this.$hero.on(transitionEnd, () => {
      this.setState({ currentState: HERO_OPENED });
      $(window).on('scroll.hero', this.close);
      this.$hero.off(transitionEnd);
    });
  }
  _close() {
    if (this.isOpen()) {
      this.setState({ currentState: HERO_CLOSED });
      Mousetrap.unbind('esc', this.close);
      $(window).off('scroll.hero');

      this.restoreInitialHeroHeight();
      window.setTimeout(this.unsetHeroHeight.bind(this), 1500);
      $('body').removeClass(HERO_OPENED_CLASS);
      TastyEvents.trigger(TastyEvents.keys.hero_closed());
    }
  }
  setInitialHeroHeight() {
    this.$hero.on(transitionEnd, () => {
      $(document).trigger('domChanged');
      this.$hero.off(transitionEnd);
    });

    this.initialHeroHeight = this.$hero.height();
    this.$hero.css('height', this.heroClosedHeight);
  }
  unsetHeroHeight() {
    this.$hero.css('height', '');
  }
  restoreInitialHeroHeight() {
    this.$hero.css('height', this.heroClosedHeight);
  }
  setHeroWindowHeight() {
    this.$hero.css('height', $(window).height());
  }
  isOpen() {
    return this.state.currentState != HERO_CLOSED;
  }
  _scrollFade() {
    const $heroBox = $(this.refs.heroBox);
    const height = $heroBox.outerHeight() / 1.5;
    let scrollTop = $(window).scrollTop();

    // Не производим пересчёт значений, если hero уже вне поля видимости
    if (scrollTop < this.heroClosedHeight) {
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
  _onResize() {
    if (this.isOpen()) {
      this.setHeroWindowHeight();
    }
  }
  handleAvatarClick(ev) {
    if (!this.isOpen()) {
      this.setInitialHeroHeight();
      ev.preventDefault();
    }
    this.open();
  }
  render() {
    const { relationship, stats, user } = this.props;
    const followButtonVisible = !this.isCurrentUser() && this.props.relationship != null;
    
    return (
      <div className="hero hero-profile">
        <CloseToolbar onClick={this.close.bind(this)} />
        <div className="hero__overlay" />
        <div className="hero__gradient" />
        <div className="hero__box" ref="heroBox">
          <HeroProfileAvatar
            isOpen={this.isOpen()}
            onClick={this.handleAvatarClick.bind(this)}
            user={user}
          />
          {followButtonVisible &&
           <SmartFollowStatus
             status={relationship}
             tlogId={user.id}
           />
          }
           <HeroProfileHead user={this.props.user} />
           <HeroProfileActionsContainer
             isCurrentUser={this.isCurrentUser()}
             relationship={relationship}
             user={user}
           />
        </div>
        <HeroProfileStats
          user={ user}
          stats={stats}
        />
      </div>
    );
  }
}

HeroProfile.propTypes = {
  relationship: PropTypes.object,
  stats: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default HeroProfile;
