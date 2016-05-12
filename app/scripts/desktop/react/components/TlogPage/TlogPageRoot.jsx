import React, { Component, PropTypes } from 'react';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';
import { getTlog as inferTlog } from './index';

import { connect } from 'react-redux';
import { getTlog } from '../../actions/TlogActions';
import { getFlow }  from '../../actions/FlowActions';
import { follow } from '../../actions/RelationshipActions';
import HeroProfile from '../HeroProfile';
import HeroFlow from '../HeroComponent/HeroFlow';
import SocialShare from '../common/SocialShare';
import Calendar from '../Calendar';
import DesignPreviewService from '../../services/designPreview';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';
const tlogRequiredFields = [ 'slug', 'design', 'isFlow', 'stats' ];

function getSlug({ params, location }) {
  return (/anonymous\/new/).test(location.pathname)
    ? TLOG_SLUG_ANONYMOUS
    : params.slug || (params.anonymousEntrySlug && TLOG_SLUG_ANONYMOUS);
}

class TlogPageRoot extends Component {
  componentWillMount() {
    const { tlog, getFlow, getTlog } = this.props;

    getTlog(getSlug(this.props), tlogRequiredFields);
    if (tlog.id && tlog.isFlow) {
      getFlow(tlog.id);
    }
  }
  componentDidMount() {
    const { editing, editPreview, tlog } = this.props;

    if (tlog.isFlow) {
      setBodyLayoutClassName('layout--feed layout--flow layout--dynamic-toolbar');
    } else {
      setBodyLayoutClassName('layout--tlog layout--dynamic-toolbar');
      if (tlog.design) {
        DesignPreviewService.apply(tlog.design);
      }
    }

    if (editing) {
      this.setEditorBodyClasses(editPreview);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { tlog, getFlow, getTlog } = this.props;
    const { editing, editPreview, tlog: nextTlog } = nextProps;

    getTlog(getSlug(nextProps), tlogRequiredFields);

    if (nextTlog.id && nextTlog.isFlow) {
      document.body.className = 'layout--feed';
      setBodyLayoutClassName('layout--feed layout--flow layout--dynamic-toolbar');
      getFlow(nextTlog.id);
    } else {
      if (typeof nextTlog.design !== 'undefined' && nextTlog.design !== tlog.design) {
        setBodyLayoutClassName('layout--tlog layout--dynamic-toolbar');
        DesignPreviewService.apply(nextTlog.design);
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
  shareImg(user) {
    return (user && user.userpic && user.userpic.originalUrl)
      ? user.userpic.originalUrl
      : defaultUserpic;
  }
  render() {
    const { children, editing, flow, follow, isCurrentUser,
            location: { state }, params, tlog } = this.props;
    const { design, isFlow, slug, tlogUrl } = tlog;
    
    return (
      <div className="page__inner">
        <div className="page__paper">
          {!isFlow &&
           <div
             className="page-cover js-cover"
             style={{ backgroundImage: design && `url('${design.backgroundImageUrl}')` || '' }}
           />
          }
           <header className="page-header">
             {isFlow
              ? <HeroFlow flow={flow} tlog={tlog} />
              : <HeroProfile
                  follow={follow}
                  isCurrentUser={isCurrentUser}
                  tlog={tlog}
                />
             }
           </header>
           {children}
        </div>
        {!editing &&
         <Calendar
           entryId={params.entrySlug && state && state.id}
           tlog={tlog}
         />
        }
        {(!isFlow && !editing && tlogUrl) &&
         <SocialShare
           img={this.shareImg(tlog)}
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
  editPreview: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  flow: PropTypes.object,
  follow: PropTypes.func.isRequired,
  getFlow: PropTypes.func.isRequired,
  getTlog: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  tlog: PropTypes.object,
};

export default connect(
  (state, ownProps) => {
    const { currentUser, entities: { tlog: tlogStore } } = state;
    const tlog = inferTlog(tlogStore, getSlug(ownProps));
    const currentUserId = currentUser.data && currentUser.data.id;
    const isCurrentUser = !!(currentUserId && currentUserId === tlog.id);

    return {
      isCurrentUser,
      tlog,
      editing: state.appState.data.editing,
      editPreview: state.editor.preview,
    };
  },
  { getTlog, getFlow, follow }
)(TlogPageRoot);
