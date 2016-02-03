import React, { Component, PropTypes } from 'react';
import TlogPageBody from './TlogPageBody';
import { TLOG_SECTION_TLOG, TLOG_SECTION_FLOW } from '../../../../shared/constants/Tlog';

class TlogPageContainer extends Component {
  componentWillMount() {
    const { TlogEntriesActions, params: { slug }, sinceId } = this.props;

    TlogEntriesActions.getTlogEntriesIfNeeded({
      slug,
      section: this.section(this.props),
      date: this.date(this.props.params),
      sinceId: sinceId,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.props.TlogEntriesActions.getTlogEntriesIfNeeded({
      slug: nextProps.params.slug,
      section: this.section(nextProps),
      date: this.date(nextProps.params),
      sinceId: nextProps.sinceId,
    });
  }
  section(props) {
    const { tlog: { data: { author } }, route: { path } } = props;
    
    return (author && author.is_flow)
      ? TLOG_SECTION_FLOW
      : this.date(props.params)
        ? TLOG_SECTION_TLOG
        : path || TLOG_SECTION_TLOG;
  }
  date(params = {}) {
    const { year, month, day } = params;

    return (year && month && day) && `${year}-${month}-${day}`;
  }
  render() {
    const { currentUser, currentUserId, error, locale, queryString, sinceId,
            tlog, tlogEntries, CalendarActions, TlogEntriesActions } = this.props;

    return (
      <TlogPageBody
        CalendarActions={CalendarActions}
        TlogEntriesActions={TlogEntriesActions}
        bgStyle={{ opacity: tlog.data.design.feedOpacity }}
        currentUserId={currentUserId}
        currentUser={currentUser}
        error={error}
        locale={locale}
        queryString={queryString}
        section={this.section(this.props)}
        sinceId={sinceId}
        tlog={tlog}
        tlogEntries={tlogEntries}
      />
    );
  }
}

TlogPageContainer.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
  TlogEntriesActions: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  currentUserId: PropTypes.number,
  error: PropTypes.string,
  isLogged: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  nextPageUrl: PropTypes.string,
  params: PropTypes.object.isRequired,
  prevPageUrl: PropTypes.string,
  queryString: PropTypes.string,
  route: PropTypes.object,
  sinceId: PropTypes.string,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object,
};

export default TlogPageContainer;
