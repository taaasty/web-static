/*global i18n, Routes */
import React, { Component } from 'react';

import * as ProjectTypes from '../../../../shared/react/ProjectTypes';

import Hero from '../hero/feed';
import FollowButton from '../buttons/relationship/follow';

export default class HeroFlow extends Component {
  static propTypes = {
    flow: ProjectTypes.flow.isRequired,
    relationship: ProjectTypes.relationship,
  }
  state = { flow: this.props.flow }
  writeButton() {
    function redirect() {
      window.location.href = Routes.new_entry_url(this.state.flow.slug);
    }
    
    return (
        //cannot use <a> with href. it breaks the design of the button
        <button className="button button--extra-small button--green"
          onClick={redirect.bind(this)}
        >
          {i18n.t('buttons.hero_create_entry')}
        </button>
    );
  }
  render() {
    const {
      can_write,
      flowpic: { original_url },
      name,
      public_tlog_entries_count
    } = this.state.flow;
    const { reader_id, state } = this.props.relationship;
    
    return (
      <Hero backgroundUrl={original_url}
        entriesCount={public_tlog_entries_count}
        title={`#${name}`}
      >
        <div className="hero__actions hero__actions--visible">
          {can_write && this.writeButton()}
          <FollowButton status={state} user={this.state.flow} />
        </div>
      </Hero>
    );
  }
}
