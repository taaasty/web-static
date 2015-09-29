import React, { PropTypes } from 'react';
import PopupActionCreators from '../../actions/popup';
import Hero from './Hero';

export default class HeroFlows {
  static propTypes = {
    flowsCount: PropTypes.number,
    backgroundUrl: PropTypes.string.isRequired,
    canCreate: PropTypes.bool,
    text: PropTypes.string
  }
  render() {
    return (
      <Hero backgroundUrl={this.props.backgroundUrl}
            title={i18n.t('hero.flows')}
            text={this.getText()}
            actions={this.getActions()} />
    );
  }
  renderCreateButton() {
    if (this.props.canCreate) {
      return (
        <button
            className="button button--small button--green"
            onClick={this.createFlow}
            key="createButton">
          {i18n.t('buttons.hero_create_flow')}
        </button>
      );
    }
  }
  createFlow() {
    PopupActionCreators.createFlow();
  }
  getText() {
    const { flowsCount, text } = this.props;
    return text
      ? text
      : flowsCount
        ? i18n.t('hero.flows_count', { count: flowsCount })
        : null;
  }
  getActions() {
    return [
      this.renderCreateButton()
    ];
  }
}
