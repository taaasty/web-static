/*global i18n */
import React, { Component, PropTypes } from 'react';
import Scroller from '../common/Scroller';
import Routes from '../../../../shared/routes/routes';
import { Link } from 'react-router';
import uri from 'urijs';
import { connect } from 'react-redux';
import { getTlogTagsIfNeeded } from '../../actions/TlogTagsActions';

class HeroProfileStatsTagsPopup extends Component {
  componentDidMount() {
    const { getTlogTagsIfNeeded, tlogId } = this.props;

    getTlogTagsIfNeeded(tlogId);
  }
  renderListItem(tag, key) {
    const { name, taggingsCount } = tag;
    const { close, tlogSlug } = this.props;
    const url = Routes.userTag(tlogSlug, name);

    return (
      <article className="tag" key={key}>
        <Link
          className="tag__link"
          onClick={close}
          title={`#${name}`}
          to={uri(url).path()}
        >
          <span className="tag__count">
            {taggingsCount}
          </span>
          <span className="tag__text">
            {`#${name}`}
          </span>
        </Link>
      </article>
    );
  }
  renderList() {
    return (
      <section className="users">
        {this.props.tags.map(this.renderListItem.bind(this))}
      </section>
    );
  }
  renderMessage() {
    const { error, isFetching} = this.props;
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
    const { isFetching, tags } = this.props;

    return (
      <Scroller className="scroller--tags">
        {tags && tags.length > 0 && !isFetching
         ? this.renderList()
         : this.renderMessage()
        }
      </Scroller>
    );
  }
}

HeroProfileStatsTagsPopup.propTypes = {
  close: PropTypes.func,
  error: PropTypes.object,
  getTlogTagsIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  tlogId: PropTypes.number.isRequired,
  tlogSlug: PropTypes.string.isRequired,
};

export default connect(
  (state, { tlogId, ...rest }) => {
    const { error, isFetching, tags } = state.tlogTags;

    return {
      ...rest,
      tlogId,
      error,
      isFetching,
      tags,
    };
  },
  { getTlogTagsIfNeeded }
)(HeroProfileStatsTagsPopup);
