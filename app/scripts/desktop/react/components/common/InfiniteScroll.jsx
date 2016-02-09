/*global $ */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Spinner from '../../../../shared/react/components/common/Spinner';

const windowHeight = $(window).height();
const THRESHOLD = windowHeight * 2;

class InfiniteScroll extends Component {
  componentDidMount() {
    this.prefill();
    this.scrollHandler = this.handleScroll.bind(this);
    $(window).on('scroll', this.scrollHandler);
  }
  componentDidUpdate() {
    const { onAfterLoad } = this.props;

    this.prefill();
    $(document).trigger('domChanged');
    if (typeof onAfterLoad === 'function') {
      onAfterLoad();
    }
  }
  componentWillUnmount() {
    $(window).off('scroll', this.scrollHandler);
  }
  prefill() {
    const { canLoad, onLoad } = this.props;
    const $window = $(window);
    const $node = $(findDOMNode(this));

    if (canLoad && $node.height() <= $window.height()) {
      onLoad();
    }
  }
  handleScroll() {
    const { canLoad, onLoad } = this.props;

    if (canLoad && ($(window).scrollTop() + $(window).height() > $(document).height() - THRESHOLD)) {
      onLoad();
    }
  }
  renderSpinner() {
    return (
      <div className="page-loader">
        <Spinner size={24} />
      </div>
    );
  }
  render() {
    const { children, loading } = this.props;

    return (
      <div>
        {children}
        {loading && this.renderSpinner()}
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
  onAfterLoad: PropTypes.func,
  onLoad: PropTypes.func.isRequired,
};

export default InfiniteScroll;
