/*global $, TastyEvents, Mousetrap */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import { follow } from '../../actions/RelationshipActions';
import HeroProfileActionsContainer from './HeroProfileActionsContainer';
import CloseToolbar from '../toolbars/CloseToolbar';
import HeroProfileAvatar from './HeroProfileAvatar';
import HeroProfileHead from './HeroProfileHead';
import HeroProfileStats from './HeroProfileStats';
import SmartFollowStatus from './SmartFollowStatus';
import Spinner from '../../../../shared/react/components/common/Spinner';

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
  componentWillUnmount() {
    $(window).off('resize', this.onResize);
    $(window).off('scroll', this.scrollFade);

    TastyEvents.off(TastyEvents.keys.command_hero_open(), this.open);
    TastyEvents.off(TastyEvents.keys.command_hero_close(), this.close);
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
    const { currentUser, tlog } = this.props;
    const { data: { author, my_relationship: relState, stats },
            errorRelationship, isFetching, isFetchingRelationship } = tlog;
    const currentUserId = currentUser && currentUser.id;
    const isCurrentUser = currentUserId && currentUserId === author.id;
    const followButtonVisible = !isCurrentUser && relState != null;
    
    return (
      <div className="hero hero-profile">
        <CloseToolbar onClick={this.close.bind(this)} />
        <div className="hero__overlay" />
        <div className="hero__gradient" />
        <div className="hero__box" ref="heroBox">
          {!author.id || isFetching
           ? <Spinner size={70} />
           : <HeroProfileAvatar
               isOpen={this.isOpen()}
               onClick={this.handleAvatarClick.bind(this)}
               user={author}
             />
          }
          {followButtonVisible &&
           <SmartFollowStatus
             error={errorRelationship}
             follow={follow.bind(null, author.id)}
             isFetching={isFetchingRelationship}
             relState={relState}
           />
          }
           {author.id && !isFetching && <HeroProfileHead user={author} />}
           <HeroProfileActionsContainer
             isCurrentUser={!!isCurrentUser}
             relState={relState}
             tlog={tlog}
           />
        </div>
        <HeroProfileStats stats={stats} user={author} />
      </div>
    );
  }
}

HeroProfile.propTypes = {
  currentUser: PropTypes.object,
  follow: PropTypes.func.isRequired,
  tlog: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    currentUser: state.currentUser.data,
    tlog: state.tlog,
  }),
  { follow }
)(HeroProfile);
