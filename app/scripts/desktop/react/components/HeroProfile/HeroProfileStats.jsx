/*global i18n */
import React, { Component, PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import HeroProfileStatsItem from './HeroProfileStatsItem';
import HeroProfileStatsPopup from './HeroProfileStatsPopup';
import HeroProfileStatsFollowersPopup from './HeroProfileStatsFollowersPopup';
import HeroProfileStatsFollowingsPopup from './HeroProfileStatsFollowingsPopup';
import HeroProfileStatsTagsPopup from './HeroProfileStatsTagsPopup';

class HeroProfileStats extends Component {
  state = {
    isFollowersPopupVisible: false,
    isFollowingsPopupVisible: false,
    isTagsPopupVisible: false,
  };
  isPrivate() {
    return this.props.user.get('isPrivacy');
  }
  handleFollowersClick() {
    this.setState({
      isFollowersPopupVisible: !this.state.isFollowersPopupVisible,
      isFollowingsPopupVisible: false,
      isTagsPopupVisible: false,
    });
  }
  handleFollowingsClick() {
    this.setState({
      isFollowingsPopupVisible: !this.state.isFollowingsPopupVisible,
      isFollowersPopupVisible: false,
      isTagsPopupVisible: false,
    });
  }
  handleTagsClick() {
    this.setState({
      isTagsPopupVisible: !this.state.isTagsPopupVisible,
      isFollowersPopupVisible: false,
      isFollowingsPopupVisible: false,
    });
  }
  renderFollowersCount() {
    const followersCount = this.props.user.getIn([ 'stats', 'followersCount' ]);

    return !!followersCount && (
      <span className="hero__stats-item-wrapper">
        <HeroProfileStatsItem
          count={followersCount}
          key="followers"
          onClick={this.handleFollowersClick.bind(this)}
          title={i18n.t('stats_followers_count', { count: followersCount })}
        />
        {this.state.isFollowersPopupVisible &&
         <HeroProfileStatsPopup
           close={() => this.setState({ isFollowersPopupVisible: false })}
           title={i18n.t('followers')}
         >
           <HeroProfileStatsFollowersPopup tlogId={this.props.user.get('id')} />
         </HeroProfileStatsPopup>
        }
      </span>
    );
  }
  renderFollowingsCount() {
    const followingsCount = this.props.user.getIn([ 'stats', 'followingsCount' ]);

    return !!followingsCount && (
      <span className="hero__stats-item-wrapper">
        <HeroProfileStatsItem
          count={followingsCount}
          key="followings"
          onClick={this.handleFollowingsClick.bind(this)}
          title={i18n.t('stats_followings_count', { count: followingsCount })}
        />
        {this.state.isFollowingsPopupVisible &&
         <HeroProfileStatsPopup
           close={() => this.setState({ isFollowingsPopupVisible: false })}
           title={i18n.t('followings')}
         >
           <HeroProfileStatsFollowingsPopup tlogId={this.props.user.get('id')} />
         </HeroProfileStatsPopup>
        }
      </span>
    );
  }
  renderFavoritesCount() {
    const favoritesCount = this.props.user.getIn([ 'stats', 'favoritesCount' ]);
    const url = this.isPrivate() ? '#' : Routes.tlog_favorite_entries_path(this.props.user.get('slug'));

    return (!!favoritesCount &&
      <HeroProfileStatsItem
        count={favoritesCount}
        href={url}
        key="favorites"
        onClick={this.props.close}
        title={i18n.t('stats_favorites_count')}
      />
    );
  }
  renderEntriesCount() {
    const entriesCount = this.props.user.getIn([ 'stats', 'entriesCount' ]);
    const url = this.isPrivate() ? '#' : this.props.user.get('tlogUrl');

    return (!!entriesCount &&
      <HeroProfileStatsItem
        count={entriesCount}
        href={url}
        key="entries"
        onClick={this.props.close}
        title={i18n.t('stats_entries_count', { count: entriesCount })}
      />
    );
  }
  renderCommentsCount() {
    const commentsCount = this.props.user.getIn([ 'stats', 'commentsCount' ]);

    return (!!commentsCount &&
      <HeroProfileStatsItem
        count={commentsCount}
        key="comments"
        title={i18n.t('stats_comments_count', { counts: commentsCount })}
      />
    );
  }
  renderDaysCount() {
    const daysCount = this.props.user.getIn([ 'stats', 'daysCount' ]);

    return (!!daysCount &&
      <HeroProfileStatsItem
        count={daysCount}
        key="days"
        title={i18n.t('stats_days_count', { count: daysCount })}
      />
    );
  }
  renderTagsCount() {
    const tagsCount = this.props.user.getIn([ 'stats', 'tagsCount' ]);

    return !!tagsCount && (
      <span className="hero__stats-item-wrapper">
        <HeroProfileStatsItem
          count={tagsCount}
          key="tags"
          onClick={this.handleTagsClick.bind(this)}
          title={i18n.t('stats_tags_count', { count: tagsCount })}
        />
        {this.state.isTagsPopupVisible &&
         <HeroProfileStatsPopup
           close={() => this.setState({ isTagsPopupVisible: false })}
           title={i18n.t('tags')}
         >
           <HeroProfileStatsTagsPopup
             tlogId={this.props.user.get('id')}
             tlogSlug={this.props.user.get('slug')}
           />
         </HeroProfileStatsPopup>
        }
      </span>
    );
  }
  render() {
    return (
      <div className="hero__stats">
        <div className="hero__stats-list">
          {this.renderFollowersCount()}
          {this.renderFollowingsCount()}
          {this.renderFavoritesCount()}
          {this.renderEntriesCount()}
          {this.renderCommentsCount()}
          {this.renderDaysCount()}
          {this.renderTagsCount()}
        </div>
      </div>
    );
  }
}

HeroProfileStats.propTypes = {
  close: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default HeroProfileStats;
