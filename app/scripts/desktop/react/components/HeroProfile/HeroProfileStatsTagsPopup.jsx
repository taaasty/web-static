/*global i18n, NoticeService, ReactUnmountMixin, RequesterMixin,
 ScrollerMixin, ComponentManipulationsMixin */
import React, { createClass, PropTypes } from 'react';
import ApiRoutes from '../../../../shared/routes/api';
import Routes from '../../../../shared/routes/routes';

const HeroProfileStatsTagsPopup = createClass({
  propTypes: {
    onClose: PropTypes.func,
    userID: PropTypes.number.isRequired,
    userSlug: PropTypes.string.isRequired,
  },
  mixins: [ 'ReactActivitiesUser', ReactUnmountMixin, RequesterMixin,
           ScrollerMixin, ComponentManipulationsMixin ],

  getInitialState() {
    return ({
      tags: null,
      isError: false,
      isLoading: false,
    });
  },

  componentDidMount() {
    this.loadTags();
  },

  loadTags() {
    this.safeUpdate(() => this.incrementActivities());
    this.setState({
      isError: false,
      isLoading: true,
    });
    this.createRequest({
      url: ApiRoutes.tlog_tags(this.props.userID),
      success: (data) => {
        this.safeUpdateState({ tags: data });
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

  renderListItem(tag, key) {
    const { name, taggings_count } = tag;
    const { userSlug } = this.props;

    return (
      <article className="tag" key={key}>
        <a
          className="tag__link"
          href={Routes.userTag(userSlug, name)}
          title={`#${name}`}
        >
          <span className="tag__count">
            {taggings_count}
          </span>
          <span className="tag__text">
            {`#${name}`}
          </span>
        </a>
      </article>
    );
  },

  renderList() {
    return (
      <section className="users">
        {this.state.tags.map(this.renderListItem)}
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
    const { tags } = this.state;

    return (
      <div className="scroller scroller--tags" ref="scroller">
        <div className="scroller__pane js-scroller-pane">
          {tags && tags.length > 0
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

export default HeroProfileStatsTagsPopup;
