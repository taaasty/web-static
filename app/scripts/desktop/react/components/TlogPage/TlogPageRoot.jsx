import React, { Component, PropTypes } from 'react';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';

import { connect } from 'react-redux';
import { getTlog } from '../../actions/TlogActions';
import HeroProfile from '../HeroProfile';
import HeroFlow from '../HeroComponent/HeroFlow';
import SocialShare from '../common/SocialShare';
import Calendar from '../Calendar';
import DesignPreviewService from '../../services/designPreview';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';

class TlogPageRoot extends Component {
  componentWillMount() {
    this.props.getTlog(this.slug(this.props));
  }
  componentDidMount() {
    const { tlogId, entities, editing, editPreview } = this.props;
    const tlog = entities.tlog[tlogId];

    if (this.isFlow(this.props)) {
      setBodyLayoutClassName('layout--feed layout--flow layout--dynamic-toolbar');
    } else {
      setBodyLayoutClassName('layout--tlog layout--dynamic-toolbar');
      if (tlog && tlog.design) {
        DesignPreviewService.apply(tlog.design);
        this.noDesign = false;
      } else {
        this.noDesign = true;
      }
    }

    if (editing) {
      this.setEditorBodyClasses(editPreview);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { tlogId: nextTlogId, entities, editing, editPreview } = nextProps;
    const tlog = entities.tlog[this.props.tlogId];
    const nextTlog = entities.tlog[nextTlogId];

    this.props.getTlog(this.slug(nextProps));

    if (this.isFlow(nextProps)) {
      setBodyLayoutClassName('layout--feed layout--flow layout--dynamic-toolbar');
    } else {
      if (tlog && tlog.design && nextTlog && nextTlog.design &&
          nextTlog.design !== tlog.design || this.noDesign) {
        setBodyLayoutClassName('layout--tlog layout--dynamic-toolbar');
        DesignPreviewService.apply(nextTlog.design);
        this.noDesign = false;
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
  isFlow(props) {
    return props.tlog && (props.entities.tlog[props.tlog] || {}).isFlow;
  }
  slug({ params, location }) {
    return (/anonymous\/new/).test(location.pathname)
      ? TLOG_SLUG_ANONYMOUS
      : params.slug || (params.anonymousEntrySlug && TLOG_SLUG_ANONYMOUS);
  }
  shareImg(user) {
    return (user && user.userpic && user.userpic.originalUrl)
      ? user.userpic.originalUrl
      : defaultUserpic;
  }
  render() {
    const { children, editing, entities, params, tlogId } = this.props;
    const tlog = entities.tlog[tlogId] || { design: {} };
    const { design: { backgroundImageUrl }, slug, tlogUrl } = tlog;
    const isFlow = this.isFlow(this.props);
    
    return (
      <div className="page__inner">
        <div className="page__paper">
          {!isFlow &&
           <div className="page-cover js-cover" style={{ backgroundImage: `url('${backgroundImageUrl}')` }} />
          }
           <header className="page-header">
             {isFlow ? <HeroFlow /> : <HeroProfile />}
           </header>
           {children}
        </div>
        {!editing && <Calendar isEntry={!!params.entryPath} />}
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
  entities: PropTypes.object.isRequired,
  getTlog: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  tlogId: PropTypes.number,
};

export default connect(
  (state) => ({
    editing: state.appState.data.editing,
    editPreview: state.editor.preview,
    entities: state.entities,
    tlogId: state.tlog.data,
  }),
  { getTlog }
)(TlogPageRoot);
