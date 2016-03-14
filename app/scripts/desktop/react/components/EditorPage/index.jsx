import React, { Component, PropTypes } from 'react';

export const TLOG_TYPE_ANONYMOUS = 'anonymous';
export const TLOG_TYPE_PUBLIC = 'public';
export const TLOG_TYPE_PRIVATE = 'private';

class EditorPage extends Component {
  render() {
    const { design } = this.props.tlog.data;

    return (
      <div className="page-body">
        <div className="content-area">
          <div className="content-area__bg" style={{ opacity: design.feedOpacity }} />
          <div className="content-area__inner">
            <EditorNew
              tlog={tlog}
              tlogType={''}
            />
          </div>
        </div>
      </div>
    );
  }
}

EditorPage.displayName = 'EditorPage';

EditorPage.propTypes = {
  tlog: PropTypes.object.isRequired
};

export default connect(
  (state) => ({
    tlog: state.tlog.data,
  })
)(EditorPage);
