/*global i18n, NoticeService, ReactUnmountMixin, RequesterMixin,
 ScrollerMixin, ComponentManipulationsMixin */
import React, { createClass, PropTypes } from 'react';
import ApiRoutes from '../../../../shared/routes/api';
import UserAvatar from '../avatars/UserAvatar';

const HeroProfileStatsFollowingsPopup = createClass({
  propTypes: {
    onClose: PropTypes.func,
    tlogId: PropTypes.number.isRequired,
  },
  mixins: [ 'ReactActivitiesUser', ReactUnmountMixin, RequesterMixin,
           ScrollerMixin, ComponentManipulationsMixin ],

  getInitialState() {
    return ({
      relationships: null,
      isError: false,
      isLoading: false,
    });
  },

  componentDidMount() {
    this.loadFollowings();
  },

  loadFollowings() {
    this.safeUpdate(() => this.incrementActivities());
    this.setState({
      isError: false,
      isLoading: true,
    });
    this.createRequest({
      url: ApiRoutes.tlog_followings(this.props.tlogId),
      success: (data) => {
        this.safeUpdateState({ relationships: data.relationships });
      },
      error: (data) => {
        this.safeUpdateState({ isError: true });
        NoticeService.errorResponse(data);
      },
      complete: () => {
        this.safeUpdate(() => this.decrementActivities());
        this.safeUpdateState({ isLoading: false });
      },
    });
  },

  renderListItem({ user }, key) {
    const { name, tlog_url } = user;

    return (
      <article className="user__item" key={key}>
        <a
          className="user__link"
          href={tlog_url}
          title={name}
        >
          <span className="user__avatar">
            <UserAvatar size={64} user={user} />
          </span>
          <span className="user__desc">
            <span className="user__name">
              {name}
            </span>
          </span>
        </a>
      </article>
    );
  },

  renderList() {
    return (
      <section className="users">
        {this.state.relationships.map(this.renderListItem)}
      </section>
    );
  },

  renderMessage() {
    const { isError, isLoading } = this.state;
    const messageKey = isError
      ? 'hero_stats_popup_error'
      : isLoading
        ? 'hero_stats_popup_loading'
        : 'hero_stats_popup_empty';

    return (
      <div className="grid-full">
        <div className="grid-full__middle">
           <div className="popup__text">
             {i18n.t(messageKey)}
          </div>
        </div>
      </div>
    );
  },

  render() {
    const { relationships } = this.state;

    return (
      <div className="scroller scroller--users" ref="scroller">
        <div className="scroller__pane js-scroller-pane">
          {relationships && relationships.length > 0
             ? this.renderList()
             : this.renderMessage()
          }
        </div>
        <div className="scroller__track js-scroller-track">
          <div className="scroller__bar js-scroller-bar" />
        </div>
      </div>
    );
  },
});

export default HeroProfileStatsFollowingsPopup;
