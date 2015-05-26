import PopupActionCreators from '../../actions/popup';
import Hero from './Hero';

let HeroFlows = React.createClass({
  propTypes: {
    flowsCount: React.PropTypes.number.isRequired,
    backgroundUrl: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <Hero backgroundUrl={this.props.backgroundUrl}
            title={i18n.t('hero.flows')}
            text={i18n.t('hero.flows_count', {count: this.props.flowsCount})}
            actions={this.getActions()} />
    );
  },

  getActions() {
    return (
      <button className="button button--small button--green" onClick={this.createFlow}>
        {i18n.t('buttons.hero_create_flow')}
      </button>
    );
  },

  createFlow() {
    PopupActionCreators.createFlow();
  }
});

export default HeroFlows;