import React from 'react';

export default class PageHeader {
  render() {
    return (
      <div className="layout__header">
        {this.props.children}
      </div>
    );
  }
}
