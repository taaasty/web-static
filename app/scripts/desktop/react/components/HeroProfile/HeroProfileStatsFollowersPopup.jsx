/*global i18n */
import React, { Component, PropTypes } from 'react';
import UserAvatar from '../UserAvatar/new';
import Scroller from '../common/Scroller';
import { Link } from 'react-router';
import uri from 'urijs';
import { connect } from 'react-redux';
import { getFollowersIfNeeded } from '../../actions/FollowersActions';
import { Map } from 'immutable';

class HeroProfileStatsFollowersPopup extends Component {
  componentWillMount() {
    const { getFollowersIfNeeded, tlogId } = this.props;

    getFollowersIfNeeded(tlogId);
  }
  renderListItem(user, key) {
    const name = user.get('name', '');
    const tlogUrl = user.get('tlogUrl', '');

    return (
      <article className="user__item" key={key}>
        <Link
          className="user__link"
          onClick={this.props.close}
          title={name}
          to={uri(tlogUrl).path()}
        >
          <span className="user__avatar">
            <UserAvatar size={40} user={user.toJS()} />
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
        {this.props.followers.map(this.renderListItem.bind(this))}
      </section>
    );
  }
  renderMessage() {
    const { error, isFetching } = this.props;
    const messageKey = error ? 'hero_stats_popup_error'
                     : isFetching ? 'hero_stats_popup_loading'
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
    const { followers } = this.props;

    return (
      <Scroller className="scroller--users">
        {followers && followers.length > 0
         ? this.renderList()
         : this.renderMessage()
        }
      </Scroller>
    );
  }
}

HeroProfileStatsFollowersPopup.propTypes = {
  close: PropTypes.func,
  error: PropTypes.object,
  followers: PropTypes.array.isRequired,
  getFollowersIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  tlogId: PropTypes.number.isRequired,
};

export default connect(
  (state, { tlogId, ...rest }) => {
    const { ids, isFetching, error } = state.followers;

    return {
      ...rest,
      isFetching,
      error,
      tlogId,
      followers: ids.map((id) => {
        const rel = state.entities.getIn([ 'rel', id ], Map());

        return state.entities.getIn([ 'tlog', String(rel.get('reader')) ], Map());
      }),
    };
  },
  { getFollowersIfNeeded }
)(HeroProfileStatsFollowersPopup);
