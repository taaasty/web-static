/*global $ */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Spinner from '../../../../shared/react/components/common/Spinner';

const windowHeight = $(window).height();
const THRESHOLD = windowHeight * 2;

class InfiniteScroll extends Component {
  componentDidMount() {
    this._prefill();
    this.scrollHandler = this.handleScroll.bind(this);
    $(window).on('scroll', this.scrollHandler);
  }
  componentDidUpdate() {
    const { onAfterLoad } = this.props;

    this._prefill();
    $(document).trigger('domChanged');
    if (typeof onAfterLoad === 'function') {
      onAfterLoad();
    }
  }
  componentWillUnmount() {
    $(window).off('scroll', this.scrollHandler);
  }
  _prefill() {
    const { canLoad, onLoad } = this.props;
    const $node = $(findDOMNode(this));
    const $window = $(window);

    function prefill() {
      if (canLoad && $node.height() <= $window.height()) {
        onLoad();
      }
    }

    prefill();
    this._prefill = prefill;
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
  children: PropTypes.oneOfType([
    PropTypes.element, PropTypes.array
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
  canLoad: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
  onAfterLoad: PropTypes.func,
};

export default InfiniteScroll;
