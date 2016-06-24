/*global i18n */
import React, { Component, PropTypes } from 'react';
import ApiRoutes from '../../../../shared/routes/api';
import UserAvatar from '../UserAvatar/new';
import Scroller from '../common/Scroller';
import { Link } from 'react-router';
import uri from 'urijs';

class HeroProfileStatsFollowersPopup extends Component {
  state = {
    relationships: null,
    isError: false,
    isLoading: false,
  };
  componentDidMount() {
    this.loadFollowers();
  }
  loadFollowers() {
    this.safeUpdate(() => this.incrementActivities());
    this.setState({
      isError: false,
      isLoading: true,
    });
    this.createRequest({
      url: ApiRoutes.tlog_followers(this.props.tlogId),
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
  }
  renderListItem({ reader }, key) {
    const { name, tlogUrl } = reader;

    return (
      <article className="user__item" key={key}>
        <Link
          className="user__link"
          onClick={this.props.close}
          title={name}
          to={uri(tlogUrl).path()}
        >
          <span className="user__avatar">
            <UserAvatar size={40} user={reader} />
          </span>
          <span className="user__desc">
            <span className="user__name">
              {name}
            </span>
          </span>
        </Link>
      </article>
    );
  }
  renderList() {
    return (
      <section className="users">
        {this.state.relationships.map(this.renderListItem.bind(this))}
      </section>
    );
  }
  renderMessage() {
    const { isError, isLoading } = this.state;
    const messageKey = isError ? 'hero_stats_popup_error'
                     : isLoading ? 'hero_stats_popup_loading'
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
  }
  render() {
    const { relationships } = this.state;

    return (
      <Scroller className="scroller--users">
        {relationships && relationships.length > 0
         ? this.renderList()
         : this.renderMessage()
        }
      </Scroller>
    );
  }
}

HeroProfileStatsFollowersPopup.propTypes = {
  close: PropTypes.func,
  tlogId: PropTypes.number.isRequired,
};

export default HeroProfileStatsFollowersPopup;
