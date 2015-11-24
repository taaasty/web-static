/*global $, i18n, ReactGrammarMixin, HeroProfileStats_Popup, 
 HeroProfileStats_FollowersPopup, HeroProfileStats_FollowingsPopup,
 HeroProfileStats_TagsPopup */
import React, { createClass, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import HeroProfileStatsItem from './HeroProfileStatsItem';

const HeroProfileStats = createClass({
  propTypes: {
    stats: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  },
  mixins: [ ReactGrammarMixin ],

  componentDidMount() {
    this.container = document.querySelectorAll('[popup-hero-stats-container]')[0];

    if (!this.container) {
      this.container = $('<\div>', {'popup-hero-stats-container': ''}).appendTo('body').get(0);
    }
  },
  
  _isPrivate() {
    return this.props.user.is_privacy;
  },

  handleFollowersClick($el) {
    React.render((
      <HeroProfileStats_Popup
        title={i18n.t('followers')}
        toggle={$el}
      >
        <HeroProfileStats_FollowersPopup tlogId={this.props.user.id} />
      </HeroProfileStats_Popup>
    ), this.container);
  },
  
  handleFollowingsClick($el) {
    React.render((
      <HeroProfileStats_Popup
        title={i18n.t('followings')}
        toggle={$el}
      >
        <HeroProfileStats_FollowingsPopup tlogId={this.props.user.id} />
      </HeroProfileStats_Popup>
    ), this.container);
  },

  handleTagsClick($el) {
    React.render((
      <HeroProfileStats_Popup
        title={i18n.t('tags')}
        toggle={$el}
      >
        <HeroProfileStats_TagsPopup
          userID={this.props.user.id}
          userSlug={this.props.user.slug}
        />
      </HeroProfileStats_Popup>
    ), this.container);
  },

  renderFollowersCount() {
    const { followers_count } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={followers_count}
        key="followers"
        onClick={this.handleFollowersClick}
        title={i18n.t('stats_followers_count', { count: followers_count })}
      />
    );
  },

  renderFollowingsCount() {
    const { followings_count } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={followings_count}
        key="followings"
        onClick={this.handleFollowingsClick}
        title={i18n.t('stats_followings_count', { count: followings_count })}
      />
    );
  },

  renderFavoritesCount() {
    const url = this._isPrivate() ? '#' : Routes.tlog_favorite_entries_path(this.props.user.slug);

    return (
      <HeroProfileStatsItem
        count={this.props.stats.favorites_count}
        href={url}
        key="favorites"
        title={i18n.t('stats_favorites_count')}
      />
    );
  },

  renderEntriesCount() {
    const { entries_count } = this.props.stats;
    const url = this._isPrivate() ? '#' : this.props.user.tlog_url;

    return (
      <HeroProfileStatsItem
        count={entries_count}
        href={url}
        key="entries"
        title={i18n.t('stats_entries_count', { count: entries_count })}
      />
    );
  },

  renderCommentsCount() {
    const { comments_count } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={comments_count}
        key="comments"
        title={i18n.t('stats_comments_count', { counts: comments_count })}
      />
    );
  },

  renderDaysCount() {
    const { days_count } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={days_count}
        key="days"
        title={i18n.t('stats_days_count', { count: days_count })}
      />
    );
  },

  renderTagsCount() {
    const { tags_count } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={tags_count}
        key="tags"
        onClick={this.handleTagsClick}
        title={i18n.t('stats_tags_count', { count: tags_count })}
      />
    );
  },

  render() {
    const { comments_count, days_count, entries_count, favorites_count,
            followers_count, followings_count, tags_count } = this.props.stats;

    return (
      <div className="hero__stats">
        <div className="hero__stats-list">
          {!!followers_count && this.renderFollowersCount()}
          {!!followings_count && this.renderFollowingsCount()}
          {!!favorites_count && this.renderFavoritesCount()}
          {!!entries_count && this.renderEntriesCount()}
          {!!comments_count && this.renderCommentsCount()}
          {!!days_count && this.renderDaysCount()}
          {!!tags_count && this.renderTagsCount()}
        </div>
      </div>
    );
  },
});
  
export default HeroProfileStats;
