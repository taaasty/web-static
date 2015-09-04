import React from 'react';

export default class PageBody {
  render() {
    return (
      <div className="layout__body">
        {this.props.children}
      </div>
    );
  }
}
