import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import EntryBricksContainer from '../EntryBricks';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';
import {
  appendTagEntries,
  getTagEntriesIfNeeded,
} from '../../actions/TagEntriesActions';

class TagsPage extends Component {
  componentWillMount() {
    this.props.getTagEntriesIfNeeded(this.props.routeParams);
  }
  componentDidMount() {
    setBodyLayoutClassName('layout--feed');
  }
  componentWillReceiveProps(nextProps) {
    this.props.getTagEntriesIfNeeded(nextProps.routeParams);
  }
  render() {
    const { appendTagEntries, routeParams, tagEntries } = this.props;
    const title = routeParams.tags && routeParams.tags
            .split(',')
            .map((tag) => `#${tag}`)
            .join(', ');

    return (
      <div className="page__inner">
        <div className="page__paper">
          <div className="page-body">
            <div className="layout-outer">
              <Helmet title={title} />
              <EntryBricksContainer entries={tagEntries} loadMoreEntries={appendTagEntries} />
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

TagsPage.propTypes = {
  appendTagEntries: PropTypes.func.isRequired,
  getTagEntriesIfNeeded: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired,
  tagEntries: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    tagEntries: state.tagEntries,
  }),
  { appendTagEntries, getTagEntriesIfNeeded }
)(TagsPage);
