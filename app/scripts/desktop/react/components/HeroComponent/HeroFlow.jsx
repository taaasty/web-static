import Hero from './Hero';
import FollowButton from '../common/FollowButton';

let HeroFlow = React.createClass({
  propTypes: {
    tlog: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      design: React.PropTypes.object.isRequired,
      is_privacy: React.PropTypes.bool.isRequired,
      total_entries_count: React.PropTypes.number.isRequired
    }).isRequired,
    relState: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <Hero backgroundUrl={this.props.tlog.design.backgroundImageUrl}
            title={'#' + this.props.tlog.name}
            text={i18n.t('hero.flow_entries_count', {count: this.props.tlog.total_entries_count})}
            actions={this.getActions()} />
    );
  },

  getActions() {
    return [
      <a href={Routes.new_entry_url(this.props.tlog.slug)}
         className="button button--small button--green">
        {i18n.t('buttons.hero_create_entry')}
      </a>,
      <FollowButton {...this.props} key="followButton" />
    ];
  }
});

export default HeroFlow;