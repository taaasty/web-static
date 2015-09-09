import React from 'react';

export default class PageLayout {
  render() {
    return (
      <div className="layout">
        {this.props.children}
      </div>
    );
  }
}
