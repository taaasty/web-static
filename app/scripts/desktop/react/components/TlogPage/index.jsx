import React, { Component, PropTypes } from 'react';
import TlogPageBody from './TlogPageBody';
import { TLOG_SECTION_TLOG, TLOG_SECTION_FLOW } from '../../../../shared/constants/Tlog';

class TlogPageContainer extends Component {
  componentWillMount() {
    const { TlogEntriesActions, params: { slug } } = this.props;

    TlogEntriesActions.getTlogEntriesIfNeeded(slug, this.section(this.props));
  }
  componentWillReceiveProps(nextProps) {
    this.props.TlogEntriesActions.getTlogEntriesIfNeeded(
      nextProps.params.slug,
      this.section(nextProps)
    );
  }
  section(props) {
    const { tlog: { data: { author } }, route: { path } } = props;
    
    return (author && author.is_flow)
      ? TLOG_SECTION_FLOW
      : path || TLOG_SECTION_TLOG;
  }
  render() {
    const { currentUserId, error, locale, queryString, tlog, tlogEntries,
            CalendarActions, TlogEntriesActions } = this.props;

    return (
      <TlogPageBody
        CalendarActions={CalendarActions}
        TlogEntriesActions={TlogEntriesActions}
        bgStyle={{ opacity: tlog.data.design.feedOpacity }}
        currentUserId={currentUserId}
        error={error}
        locale={locale}
        queryString={queryString}
        section={this.section(this.props)}
        tlog={tlog}
        tlogEntries={tlogEntries}
      />
    );
  }
}

TlogPageContainer.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
  TlogEntriesActions: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
  error: PropTypes.string,
  isLogged: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  nextPageUrl: PropTypes.string,
  params: PropTypes.object.isRequired,
  prevPageUrl: PropTypes.string,
  queryString: PropTypes.string,
  route: PropTypes.object,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object,
};

export default TlogPageContainer;
