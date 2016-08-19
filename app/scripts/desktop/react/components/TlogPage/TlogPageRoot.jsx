import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';

import { connect } from 'react-redux';
import { getTlog } from '../../actions/TlogActions';
import { getFlow } from '../../actions/FlowActions';
import {
  showSettingsPopup,
  closeHero,
  openHero,
} from '../../actions/AppStateActions';
import HeroProfile from '../HeroProfile';
import HeroFlow from '../HeroComponent/HeroFlow';
import SocialShare from '../common/SocialShare';
import Calendar from '../Calendar';
import DesignPreviewService from '../../services/designPreview';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';

const emptyTlog = Map();
const emptyFlow = Map();
const emptyRel = Map();
const emptyDesign = Map();
const emptyChanges = Map();

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';
const tlogRequiredFields = [ 'slug', 'design', 'isFlow', 'stats' ];
const flowRequiredFields = [ 'canEdit', 'canWrite', 'design', 'staffs' ];

export function getSlug({ params, location }) {
  return (/anonymous\/new/).test(location.pathname) || params.anonymousEntrySlug
    ? TLOG_SLUG_ANONYMOUS
    : params.slug;
}

class TlogPageRoot extends Component {
  componentWillMount() {
    const {
      tlog,
      getFlow,
      getTlog,
    } = this.props;

    getTlog(getSlug(this.props), tlogRequiredFields);
    if (tlog.get('id') && tlog.get('isFlow')) {
      getFlow(tlog.get('id'), flowRequiredFields);
    }
  }
  componentDidMount() {
    const {
      design,
      editing,
      editPreview,
      tlog,
    } = this.props;

    if (tlog.get('isFlow')) {
      setBodyLayoutClassName('layout--feed layout--flow layout--dynamic-toolbar');
    } else {
      setBodyLayoutClassName('layout--tlog layout--dynamic-toolbar');
      if (!design.isEmpty()) {
        DesignPreviewService.apply(design.toJS());
      }
    }

    if (editing) {
      this.setEditorBodyClasses(editPreview);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      design,
      getFlow,
      getTlog,
    } = this.props;
    const {
      design: nextDesign,
      editing,
      editPreview,
      tlog: nextTlog,
    } = nextProps;

    getTlog(getSlug(nextProps), tlogRequiredFields);

    if (nextTlog.get('id') && nextTlog.get('isFlow')) {
      setBodyLayoutClassName('layout--feed layout--flow layout--dynamic-toolbar');
      getFlow(nextTlog.get('id'), flowRequiredFields);
    } else {
      if (design !== nextDesign) {
        setBodyLayoutClassName('layout--tlog layout--dynamic-toolbar');
        DesignPreviewService.apply(nextDesign.toJS());
      }
    }

    if (editing) {
      this.setEditorBodyClasses(editPreview);
    } else {
      document.body.classList.remove('tlog-mode-minimal');
      document.body.classList.remove('tlog-mode-full');
    }
  }
  componentWillUnmount() {
    DesignPreviewService.reset();
    document.body.classList.remove('tlog-mode-minimal');
    document.body.classList.remove('tlog-mode-full');
  }
  setEditorBodyClasses(preview) {
    if (preview) {
      document.body.classList.remove('tlog-mode-minimal');
      document.body.classList.add('tlog-mode-full');
    } else {
      document.body.classList.remove('tlog-mode-full');
      document.body.classList.add('tlog-mode-minimal');
    }
  }
  render() {
    const {
      children,
      closeHero,
      editing,
      flow,
      isCurrentUser,
      isHeroOpen,
      location: {
        state,
      },
      openHero,
      params,
      showSettingsPopup,
      tlog,
      tlogRelation,
    } = this.props;
    const isFlow = tlog.get('isFlow');
    const tlogUrl = tlog.get('tlogUrl');
    const slug = tlog.get('slug');
    const backgroundImageUrl = tlog.getIn([ 'design', 'backgroundImageUrl' ]);

    return (
      <div className="page__inner">
        <div className="page__paper">
          {!isFlow &&
            <div
              className="page-cover js-cover"
              style={{ backgroundImage: backgroundImageUrl ? `url('${backgroundImageUrl}')` : '' }}
            />
          }
          <header className="page-header">
            {isFlow
              ? <HeroFlow flow={flow} tlog={tlog} />
              : (
                <HeroProfile
                  closeHero={closeHero}
                  isCurrentUser={isCurrentUser}
                  isOpen={isHeroOpen}
                  openHero={openHero}
                  showSettingsPopup={showSettingsPopup}
                  tlog={tlog}
                  tlogRelation={tlogRelation}
                />
              )
            }
          </header>
          {children}
        </div>
        {(!editing && !isFlow) &&
          <Calendar
            entryId={params.entrySlug && state && state.id}
            tlog={tlog}
          />
        }
        {(!isFlow && !editing && tlogUrl) &&
          <SocialShare
            img={tlog.getIn([ 'userpic', 'originalUrl' ], defaultUserpic)}
            title={slug}
            url={tlogUrl}
          />}
      </div>
    );
  }
}

TlogPageRoot.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  closeHero: PropTypes.func.isRequired,
  design: PropTypes.object.isRequired,
  editPreview: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  flow: PropTypes.object,
  getFlow: PropTypes.func.isRequired,
  getTlog: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  isHeroOpen: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  openHero: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  showSettingsPopup: PropTypes.func.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogRelation: PropTypes.object.isRequired,
};

export default connect(
  (state, ownProps) => {
    const { currentUser, entities } = state;
    const tlog = entities.get('tlog').find((t) => t.get('slug') === getSlug(ownProps), null, emptyTlog);
    const flow = entities.getIn([ 'flow', String(tlog.get('id')) ], emptyFlow);
    const tlogRelation = entities.getIn([ 'rel', tlog.get('myRelationshipObject') ], emptyRel);
    const currentUserId = currentUser.data && currentUser.data.id;
    const isCurrentUser = !!(currentUserId && currentUserId === tlog.get('id'));
    const designChanges = state.design.get('changes', emptyChanges);
    const currentDesign = tlog.get('design', emptyDesign);
    const isHeroOpen = state.appState.isHeroOpen;

    const design = currentDesign.merge(designChanges);

    return {
      design,
      flow,
      isCurrentUser,
      isHeroOpen,
      tlog,
      tlogRelation,
      editing: state.appState.editing,
      editPreview: state.editor.get('preview'),
    };
  },
  {
    getTlog,
    getFlow,
    showSettingsPopup,
    closeHero,
    openHero,
  }
)(TlogPageRoot);
