import React, { Component } from 'react';
import { connect } from 'react-redux';
import TlogPageRoot from '../components/TlogPageRoot';

class TlogPageRootContainer extends Component {
  componentWillUpdate({ tlog: nextTlog }) {
    if (nextTlog.slug !== this.props.tlog.slug) {
      console.log('update tlog data');
    }
  }
  render() {
    return <TlogPageRoot {...this.props} />;
  }
}

export default connect(
  (state) => ({
    currentUserId: state.currentUser.data.id,
    isLogged: !!state.currentUser.data.id,
    tlog: state.tlog,
    tlogEntries: {},
    tlogEntry: state.tlogEntry,
  })
)(TlogPageRootContainer);
