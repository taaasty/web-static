/*global TastyEvents */
import React, { Component } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';

class HeroProfileHead extends Component {
  state = {
    user: this.props.user,
  }
  componentDidMount() {
    TastyEvents.on(TastyEvents.keys.user_property_changed('title', this.state.user.id), this._updateTitle);
    TastyEvents.on(TastyEvents.keys.user_property_changed('slug', this.state.user.id), this._updateSlug);
  }
  componentWillUnmount() {
    TastyEvents.off(TastyEvents.keys.user_property_changed('title', this.state.user.id), this._updateTitle);
    TastyEvents.off(TastyEvents.keys.user_property_changed('slug', this.state.user.id), this._updateSlug);
  }
  _updateTitle(value) {
    const newUser = this.state.user;
    newUser.title = value;

    this.setState({ user: newUser });
  }

  _updateSlug(value) {
    const newUser = this.state.user;
    newUser.slug = value;

    this.setState({ user: newUser });
  }
  render() {
    const { user } = this.state;

    return (
        <div className="hero__head">
      <div className="hero__mask"></div>
      <div className="hero__title">
        <span>
          <a href={user.tlog_url}>
            {user.slug}
          </a>
        </span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: user.title || '' }} />
      </div>
    </div>
    );
  }
}

HeroProfileHead.propTypes = {
  user: ProjectTypes.heroUser.isRequired,
};

export default HeroProfileHead;
