/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import EntryTlogsContainer from '../EntryTlogs';
import EntryBricksContainer from '../EntryBricks';
import FeedFilters from '../FeedFilters';
import { VIEW_STYLE_TLOG } from '../../constants/ViewStyleConstants';

class FlowPageBody extends Component {
  componentDidMount() {
    this.setViewStyle(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setViewStyle(nextProps);
  }
  setViewStyle({ flow, location: { query } }) {
    if (query && query.style && flow.viewStyle !== query.style) {
      this.props.flowViewStyle(query.style);
    }
  }
  handleDeleteEntry(entryId) {
    this.props.deleteEntry(entryId);
  }
  renderTlogs() {
    const { appendTlogEntries, tlog, tlogEntries } = this.props;

    return (
      <div className="content-area">
        <div className="content-area__bg" />
        <div className="content-area__inner">
          <EntryTlogsContainer
            entries={tlogEntries}
            handleDeleteEntry={this.handleDeleteEntry.bind(this)}
            hostTlogId={tlog.data.author && tlog.data.author.id}
            loadMoreEntries={appendTlogEntries}
          />
        </div>
      </div>
    );
  }
  renderBricks() {
    const { appendTlogEntries, children, tlog, tlogEntries } = this.props;

    return (
      <EntryBricksContainer
        children={children}
        entries={tlogEntries}
        hostTlogId={tlog.data.author && tlog.data.author.id}
        loadMoreEntries={appendTlogEntries}
      />
    );
  }
  renderEmpty() {
    return (
      <div className="content-area">
        <div className="content-area__bg" />
        <div className="content-area__inner">
          <div className="posts">
            <article className="post post--text">
              <div className="post__content">
                {i18n.t('flow.empty')}
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { flow: { data: { name }, viewStyle }, location,
            tlogEntries: { data: { items }, isFetching } } = this.props;

    return (
      <div className="page-body">
        <Helmet title={name} />
        <div className="layout-outer">
          <FeedFilters
            location={location}
            navViewMode
            viewMode={viewStyle}
          />
          {!isFetching && items.length === 0
            ? this.renderEmpty()
            : viewStyle === VIEW_STYLE_TLOG
              ? this.renderTlogs()
              : this.renderBricks()
          }
        </div>
      </div>
    );
  }
}

FlowPageBody.propTypes = {
  appendTlogEntries: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  error: PropTypes.string,
  flow: PropTypes.object.isRequired,
  flowViewStyle: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  sinceId: PropTypes.string,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object,
};

FlowPageBody.defaultProps = {
  flow: {
    flowpic: {},
    viewStyle: VIEW_STYLE_TLOG,
  },
  tlog: {
    data: {
      author: {
        id: null,
        is_daylog: false,
        is_privacy: false,
      },
      tlog_url: '',
    },
  },
  tlogEntries: {
    data: {
      items: [],
    },
  },
};

export default FlowPageBody;
