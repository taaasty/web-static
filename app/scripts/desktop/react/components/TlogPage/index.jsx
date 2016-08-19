import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { getCalendar } from '../../actions/CalendarActions';
import { flowViewStyle } from '../../actions/FlowActions';
import {
  deleteEntry,
  getTlogEntries,
  getTlogEntriesIfNeeded,
  getReqParams,
} from '../../actions/TlogEntriesActions';
import {
  showSettingsPopup,
  hideSettingsPopup,
  showDesignSettingsPopup,
  hideDesignSettingsPopup,
} from '../../actions/AppStateActions';
import { sendCategory } from '../../../../shared/react/services/Sociomantic';

import TlogPageBody from './TlogPageBody';
import FlowPageBody from './FlowPageBody';

const emptyFlow = Map();
const emptyTlog = Map();

class TlogPageContainer extends Component {
  componentWillMount() {
    const { getTlogEntriesIfNeeded } = this.props;
    const reqParams = getReqParams(this.props);

    getTlogEntriesIfNeeded(reqParams);
    sendCategory(reqParams.section);
  }
  componentDidMount() {
    const {
      showSettingsPopup,
      showDesignSettingsPopup,
      route: {
        settings,
        designSettings,
      },
    } = this.props;

    if (settings) {
      showSettingsPopup();
    } else if (designSettings) {
      showDesignSettingsPopup();
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      getTlogEntriesIfNeeded,
      hideDesignSettingsPopup,
    } = this.props;
    const reqParams = getReqParams(this.props);
    const nextReqParams = getReqParams(nextProps);
    const { section } = reqParams;
    const { section: nextSection } = nextReqParams;

    getTlogEntriesIfNeeded(nextReqParams);
    if (section !== nextSection) {
      sendCategory(nextSection);
    }

    if (!nextProps.isCurrentUser) {
      hideDesignSettingsPopup();
    }
  }
  componentWillUnmount() {
    const {
      hideSettingsPopup,
      hideDesignSettingsPopup,
    } = this.props;

    hideSettingsPopup();
    hideDesignSettingsPopup();
  }
  appendTlogEntries() {
    const { getTlogEntries } = this.props;

    getTlogEntries(Object.assign(
      getReqParams(this.props),
      { sinceId: this.props.tlogEntries.data.nextSinceEntryId }
    ));
  }
  render() {
    const {
      deleteEntry,
      flow,
      flowState,
      flowViewStyle,
      getCalendar,
      isCurrentUser,
      location,
      queryString,
      tlog,
      tlogEntries,
    } = this.props;
    const { section } = getReqParams(this.props);
    const bgStyle = { opacity: tlog.getIn([ 'design', 'feedOpacity' ], '1.0') };

    return tlog.get('isFlow')
      ? (
        <FlowPageBody
          appendTlogEntries={this.appendTlogEntries.bind(this)}
          bgStyle={bgStyle}
          deleteEntry={deleteEntry}
          flow={flow}
          flowState={flowState}
          flowViewStyle={flowViewStyle}
          location={location}
          queryString={queryString}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />
       )
      : (
        <TlogPageBody
          appendTlogEntries={this.appendTlogEntries.bind(this)}
          bgStyle={bgStyle}
          deleteEntry={deleteEntry}
          getCalendar={getCalendar}
          isCurrentUser={isCurrentUser}
          queryString={queryString}
          section={section}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />
      );
  }
}

TlogPageContainer.propTypes = {
  deleteEntry: PropTypes.func.isRequired,
  flow: PropTypes.object.isRequired,
  flowState: PropTypes.object.isRequired,
  flowViewStyle: PropTypes.func.isRequired,
  getCalendar: PropTypes.func.isRequired,
  getTlogEntries: PropTypes.func.isRequired,
  getTlogEntriesIfNeeded: PropTypes.func.isRequired,
  hideDesignSettingsPopup: PropTypes.func.isRequired,
  hideSettingsPopup: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  route: PropTypes.object.isRequired,
  showDesignSettingsPopup: PropTypes.func.isRequired,
  showSettingsPopup: PropTypes.func.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
};

export default connect(
  (state, { params }) => {
    const { currentUser, tlogEntries, flow: flowState, entities } = state;
    const tlog = entities.get('tlog').find((t) => t.get('slug') === params.slug, null, emptyTlog);
    const currentUserId = currentUser.data && currentUser.data.id;
    const isCurrentUser = !!(currentUserId && currentUserId === tlog.get('id'));

    return {
      flowState,
      isCurrentUser,
      tlog,
      tlogEntries,
      flow: entities.getIn([ 'flow', String(tlog.get('id')) ], emptyFlow),
    };
  },
  {
    deleteEntry,
    getCalendar,
    getTlogEntries,
    getTlogEntriesIfNeeded,
    flowViewStyle,
    showSettingsPopup,
    hideSettingsPopup,
    showDesignSettingsPopup,
    hideDesignSettingsPopup,
  }
)(TlogPageContainer);
