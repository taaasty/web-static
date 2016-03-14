import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EditorNew from '../Editor/EditorNew';
import Spinner from '../../../../shared/react/components/common/Spinner';
import { TLOG_SLUG_ANONYMOUS } from '../../../../shared/constants/Tlog';

export const TLOG_TYPE_ANONYMOUS = 'anonymous';
export const TLOG_TYPE_PUBLIC = 'public';
export const TLOG_TYPE_PRIVATE = 'private';

class EditorPage extends Component {
  render() {
    const { data: tlog, isFetching } = this.props.tlog;
    const tlogType = tlog.slug === TLOG_SLUG_ANONYMOUS
            ? TLOG_TYPE_ANONYMOUS
            : tlog.is_privacy ? TLOG_TYPE_PRIVATE : TLOG_TYPE_PUBLIC;

    return (
      <div className="page-body">
        <div className="content-area">
          <div className="content-area__bg" style={{ opacity: tlog.design.feedOpacity }} />
          <div className="content-area__inner">
            {isFetching
             ? <Spinner size={30} />
             : <EditorNew
                 tlog={tlog}
                 tlogType={tlogType}
               />
            }
          </div>
        </div>
      </div>
    );
  }
}

EditorPage.displayName = 'EditorPage';

EditorPage.propTypes = {
  tlog: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    tlog: state.tlog,
  })
)(EditorPage);
