import React, { Component, PropTypes } from 'react';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';

import { connect } from 'react-redux';
import { getTlog } from '../../actions/TlogActions';
import HeroProfile from '../HeroProfileSPA';
import HeroFlow from '../HeroComponent/HeroFlowSPA';
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
    const { tlog, editing, editPreview } = this.props;

    if (this.isFlow(this.props)) {
      setBodyLayoutClassName('layout--feed layout--flow layout--dynamic-toolbar');
    } else {
      setBodyLayoutClassName('layout--tlog layout--dynamic-toolbar');
      DesignPreviewService.apply(tlog.design);
    }

    if (editing) {
      this.setEditorBodyClasses(editPreview);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { tlog, editing, editPreview } = nextProps;
    this.props.getTlog(this.slug(nextProps));

    if (this.isFlow(nextProps)) {
      setBodyLayoutClassName('layout--feed layout--flow layout--dynamic-toolbar');
    } else {
      if (this.props.tlog.design !== tlog.design) {
        setBodyLayoutClassName('layout--tlog layout--dynamic-toolbar');
        DesignPreviewService.apply(tlog.design);
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
    return props.tlog.author && props.tlog.author.is_flow;
  }
  slug({ params, location }) {
    return (/anonymous\/new/).test(location.pathname)
      ? TLOG_SLUG_ANONYMOUS
      : params.slug || (params.anonymousEntrySlug && TLOG_SLUG_ANONYMOUS);
  }
  shareImg(user) {
    return (user && user.userpic && user.userpic.original_url)
      ? user.userpic.original_url
      : defaultUserpic;
  }
  render() {
    const { children, editing, params, tlog } = this.props;
    const { author, design: { backgroundImageUrl }, slug, tlog_url } = tlog;
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
        {(!isFlow && !editing) &&
         <SocialShare
           img={this.shareImg(author)}
           title={slug}
           url={tlog_url}
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
  getTlog: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    editing: state.appState.data.editing,
    editPreview: state.editor.preview,
    tlog: state.tlog.data,
  }),
  { getTlog }
)(TlogPageRoot);
