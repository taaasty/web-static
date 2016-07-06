import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Relationships from './Relationships';

const ERROR_STATE = 'error',
      LOADED_STATE = 'loaded',
      LOADING_STATE = 'loading';

class RelationshipsContainer extends Component {
  render() {
    return (
      <Relationships
          state={this.state.currentState}
          relationships={this.state.relationships}
          canLoad={this.state.currentState === LOADED_STATE && this.state.hasMore}
          onLoadMore={this.loadRelationships}>
        {this.props.children}
      </Relationships>
    );
  },

  loadRelationships() {
    let { url } = this.props;
    let { sincePosition } = this.state;

    this.setState({currentState: LOADING_STATE});

    RelationshipActionCreators.load(url, sincePosition, 10)
      .then((relationships) => {
        if (this.isMounted()) {
          let sincePosition = null, hasMore = false;

          if (relationships.relationships.length) {
            sincePosition = relationships.relationships[relationships.relationships.length - 1].position;
            hasMore = relationships.relationships.length == 10;
          }

          if (this.props.onCountUpdate) {
            this.props.onCountUpdate(relationships.total_count);
          }

          this.setState({
            sincePosition, hasMore,
            relationships: this.state.relationships.concat(relationships.relationships),
            currentState: LOADED_STATE
          });
        }
      })
      .fail(() => {
        if (this.isMounted()) {
          this.setState({hasMore: false, currentState: ERROR_STATE});
        }
      });
  }
}

export default connect(
  (state) => {
    
  }
)(RelationshipsContainer);
